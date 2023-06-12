package middleware

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strings"
	"syscall"
	"time"
)

const (
	timeLimit      = 2 * time.Second   // Example time limit of 2 seconds
	memoryLimit    = 64 * 1024         // Example memory limit of 64 KB
	correctAnswer  = "CORRECT"         // Example correct answer
	wrongAnswer    = "WRONG"           // Example wrong answer
	compileError   = "COMPILE_ERROR"   // Example compile error
	timeExceeded   = "TIME_EXCEEDED"   // Example time limit exceeded
	memoryExceeded = "MEMORY_EXCEEDED" // Example memory limit exceeded
	runtimeError   = "RUNTIME_ERROR"   // Example runtime error
)

func RunCpp(codeBody string) (string, error) {
	err := ioutil.WriteFile("./solution.cpp", []byte(codeBody), 0644)
	if err != nil {
		return "", fmt.Errorf("failed to write code to file: %v", err)
	}

	err = executeCppFile("./solution.cpp")
	if err != nil {
		return compileError, fmt.Errorf("failed to execute C++ file: %v", err)
	}

	outcome, err := runExecutableWithTimeout()
	if err != nil {
		if err == context.DeadlineExceeded {
			return timeExceeded, nil
		} else if strings.Contains(err.Error(), "exited with status") {
			return runtimeError, nil
		} else if strings.Contains(err.Error(), "exceeded memory limit") {
			return memoryExceeded, nil
		}
		return compileError, fmt.Errorf("failed to run executable: %v", err)
	}

	if outcome == correctAnswer {
		isEqual, err := compareFile("./output.txt", "./expected_output.txt")
		if err != nil {
			return "", fmt.Errorf("failed to compare files: %v", err)
		}

		if !isEqual {
			return wrongAnswer, nil
		}
	} else {
		return outcome, nil
	}

	return correctAnswer, nil
}

func executeCppFile(filePath string) error {
	cmd := exec.Command("clang++", filePath) // Compile the C++ file using g++
	errOutput := &bytes.Buffer{}             // Buffer to capture the error output
	cmd.Stderr = errOutput                   // Attach the buffer to cmd.Stderr

	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("failed to compile C++ file: %v\n%s", err, errOutput.String())
	}

	return nil
}

func runExecutableWithTimeout() (string, error) {
	cmd := exec.Command("./a.out") // Execute the compiled executable

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Setpgid: true, // Create a new process group
	}

	rlimit := &syscall.Rlimit{
		Cur: memoryLimit,
		Max: memoryLimit,
	}
	err := syscall.Setrlimit(syscall.RLIMIT_DATA, rlimit)
	if err != nil {
		return "", fmt.Errorf("failed to set memory limit: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), timeLimit)
	defer cancel()

	cmd.Stdout = &bytes.Buffer{}
	cmd.Stderr = &bytes.Buffer{}

	err = cmd.Start()
	if err != nil {
		return "", fmt.Errorf("failed to start executable: %v", err)
	}

	done := make(chan error, 1)
	go func() {
		done <- cmd.Wait()
	}()

	select {
	case <-ctx.Done():
		killProcessGroup(cmd)
		return "", ctx.Err()
	case err := <-done:
		if err != nil {
			if exitErr, ok := err.(*exec.ExitError); ok {
				if status, ok := exitErr.Sys().(syscall.WaitStatus); ok {
					if status.Signaled() && status.Signal() == syscall.SIGXCPU {
						return timeExceeded, nil
					}
					if status.Signaled() && status.Signal() == syscall.SIGSEGV {
						return memoryExceeded, nil
					}
				}
			}
			return "", fmt.Errorf("failed to run executable: %v", err)
		}
	}

	output := cmd.Stdout.(*bytes.Buffer).String()
	return output, nil
}

// ...

func killProcessGroup(cmd *exec.Cmd) {
	if cmd.Process == nil {
		return
	}

	pid := cmd.Process.Pid
	pgid, err := syscall.Getpgid(pid)
	if err != nil {
		fmt.Printf("Error getting process group ID: %v\n", err)
		return
	}

	err = syscall.Kill(-pgid, syscall.SIGKILL)
	if err != nil {
		fmt.Printf("Error killing process group: %v\n", err)
	}
}

func compareFile(fileOne string, fileTwo string) (bool, error) {
	f1, err := os.Open(fileOne)
	if err != nil {
		return false, err
	}
	defer f1.Close()

	f2, err := os.Open(fileTwo)
	if err != nil {
		return false, err
	}
	defer f2.Close()

	scanner1 := bufio.NewScanner(f1)
	scanner2 := bufio.NewScanner(f2)

	for scanner1.Scan() && scanner2.Scan() {
		line1 := scanner1.Text()
		line2 := scanner2.Text()

		if line1 != line2 {
			return false, nil
		}
	}

	if scanner1.Scan() || scanner2.Scan() {
		return false, nil
	}

	return true, nil
}
