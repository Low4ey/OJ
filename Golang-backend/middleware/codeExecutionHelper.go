package middleware

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"syscall"
	"time"

	"github.com/low4ey/OJ/Golang-backend/models"
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
		line1 := strings.TrimSpace(scanner1.Text())
		line2 := strings.TrimSpace(scanner2.Text())

		if strings.ToLower(line1) != strings.ToLower(line2) {
			return false, nil
		}
	}

	if scanner1.Scan() || scanner2.Scan() {
		return false, nil
	}

	return true, nil
}

func runExecutableWithTimeout(compiler string, fileAddress string, testCases []models.TestCase) (int, error) {
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
	cmd.Stdin = nil // Clear the default standard input

	err := cmd.Start()
	if err != nil {
		return -1, fmt.Errorf("failed to start executable: %v", err)
	}

	outputFile, err := os.Create("output.txt")
	if err != nil {
		return -1, fmt.Errorf("failed to create output file: %v", err)
	}
	defer outputFile.Close()

	lastExecutedIndex := -1

	done := make(chan error, 1)

	go func() {
		for i, tc := range testCases {
			input := ""
			if tc.Testcase != nil {
				input = *tc.Testcase
			}

			cmd = exec.CommandContext(ctx, fileAddress) // Re-create the command with the updated context
			cmd.Stdin = strings.NewReader(input)        // Set the current input

			outputBuf := &bytes.Buffer{}
			cmd.Stdout = outputBuf
			cmd.Stderr = &bytes.Buffer{} // Capture standard error, if needed

			err := cmd.Run()
			if err != nil {
				if exitErr, ok := err.(*exec.ExitError); ok {
					if status, ok := exitErr.Sys().(syscall.WaitStatus); ok {
						if status.Signaled() && (status.Signal() == syscall.SIGXCPU || status.Signal() == syscall.SIGSEGV) {
							done <- fmt.Errorf("execution error: %v", err)
							return
						}
					}
				}
				done <- fmt.Errorf("execution error: %v", err)
				return
			}

			output := outputBuf.String()
			outputFile.WriteString(output + "\n")
			lastExecutedIndex = i
		}

		done <- nil
	}()

	select {
	case <-ctx.Done():
		killProcessGroup(cmd)
		return lastExecutedIndex, ctx.Err()
	case err := <-done:
		if err != nil {
			return lastExecutedIndex, err
		}
	}

	return lastExecutedIndex, nil
}

func WriteOutputToFile(testCases []models.TestCase) error {
	file, err := os.Create("./expected_output.txt")
	if err != nil {
		return fmt.Errorf("failed to create file: %v", err)
	}
	defer file.Close()

	for _, tc := range testCases {
		if tc.Output != nil {
			_, err := file.WriteString(*tc.Output + "\n")
			if err != nil {
				return fmt.Errorf("failed to write output to file: %v", err)
			}
		}
	}
	return nil
}
