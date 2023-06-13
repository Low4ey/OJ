package middleware

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"os"
	"os/exec"
	"syscall"
	"time"
)

const (
	timeLimit      = 2 * time.Second   // Example time limit of 2 seconds
	correctAnswer  = "CORRECT"         // Example correct answer
	wrongAnswer    = "WRONG"           // Example wrong answer
	compileError   = "COMPILE_ERROR"   // Example compile error
	timeExceeded   = "TIME_EXCEEDED"   // Example time limit exceeded
	memoryExceeded = "MEMORY_EXCEEDED" // Example memory limit exceeded
	runtimeError   = "RUNTIME_ERROR"   // Example runtime error
)

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

func runExecutableWithTimeout(compiler string, fileAddress string) (string, error) {
	var cmd *exec.Cmd

	if compiler != "" {
		cmd = exec.Command(compiler, fileAddress) // Execute the compiled executable using the specified compiler
	} else {
		cmd = exec.Command(fileAddress) // Execute the file directly without a compiler
	}

	ctx, cancel := context.WithTimeout(context.Background(), timeLimit)
	defer cancel()

	cmd.Stdout = &bytes.Buffer{}
	cmd.Stderr = &bytes.Buffer{}

	err := cmd.Start()
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
