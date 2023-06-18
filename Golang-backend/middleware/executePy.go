package middleware

import (
	"fmt"
	"io/ioutil"

	"github.com/low4ey/OJ/Golang-backend/models"
)

func RunPython(codeBody string, testCases []models.TestCase) (int, string, error) {
	err := ioutil.WriteFile("./solution.py", []byte(codeBody), 0644)
	if err != nil {
		return -1, "Internal Server Error", fmt.Errorf("failed to write code to file: %v", err)
	}

	outcome, err := runExecutableWithTimeout("python3", "./solution.py", testCases)
	if err != nil {
		return handleRunError(outcome, err)
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
