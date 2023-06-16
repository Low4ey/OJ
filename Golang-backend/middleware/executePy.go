package middleware

import (
	"context"
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/low4ey/OJ/Golang-backend/models"
)

func RunPython(codeBody string, testCases []models.TestCase) (int, string, error) {
	err := ioutil.WriteFile("./solution.py", []byte(codeBody), 0644)
	if err != nil {
		return -1, "Internal Server Error", fmt.Errorf("failed to write code to file: %v", err)
	}

	outcome, err := runExecutableWithTimeout("python3", "./solution.py", testCases)
	if err != nil {
		if err == context.DeadlineExceeded {
			return outcome, timeExceeded, nil
		} else if strings.Contains(err.Error(), "exited with status") {
			return outcome, runtimeError, nil
		} else if strings.Contains(err.Error(), "exceeded memory limit") {
			return outcome, memoryExceeded, nil
		}
		return outcome, compileError, fmt.Errorf("failed to run executable: %v", err)
	}

	if outcome == -1 {
		return -1, "", fmt.Errorf("no testcases executed")
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
