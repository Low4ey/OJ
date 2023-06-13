package middleware

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"os/exec"
	"strings"
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

	outcome, err := runExecutableWithTimeout("", "./a.out")
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
