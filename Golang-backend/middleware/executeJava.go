package middleware

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os/exec"
	"syscall"

	"github.com/low4ey/OJ/Golang-backend/models"
)

func RunJava(codeBody string, testcases []models.TestCase) (int, string, error) {
	err := ioutil.WriteFile("./Solution.java", []byte(codeBody), 0644)
	if err != nil {
		return -1, "", fmt.Errorf("failed to write code to file: %v", err)
	}

	compErr := compileJava("./Solution.java")
	if compErr != nil {
		return -1, "", fmt.Errorf("failed to compile Java code: %v", compErr)
	}
	outcome, err := runExecutableWithTimeout("java", "./Solution.java", testcases)
	if err != nil {
		return handleRunError(outcome, err)
	}

	if outcome == -1 {
		return -1, "", fmt.Errorf("no testcases executed during runtime")
	}

	isEqual, err := compareFile("./output.txt", "./expected_output.txt")
	if err != nil {
		return outcome, "", fmt.Errorf("failed to compare files: %v", err)
	}

	if !isEqual {
		return outcome, wrongAnswer, nil
	}

	return outcome, correctAnswer, nil
}

func compileJava(fileAddress string) error {
	cmd := exec.Command("javac", fileAddress)

	cmd.Stdout = &bytes.Buffer{}
	cmd.Stderr = &bytes.Buffer{}

	err := cmd.Run()
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			if status, ok := exitErr.Sys().(syscall.WaitStatus); ok {
				return fmt.Errorf("javac exited with status: %d", status.ExitStatus())
			}
		}
		return fmt.Errorf("failed to compile Java code: %v", err)
	}

	return nil
}
