package middleware

import (
	"context"
	"fmt"
	"io/ioutil"
	"strings"
)

func RunJava(codeBody string) (string, error) {
	// Write the code to a Java file
	err := ioutil.WriteFile("./Solution.java", []byte(codeBody), 0644)
	if err != nil {
		return "", fmt.Errorf("failed to write code to file: %v", err)
	}

	outcome, err := runExecutableWithTimeout("java", "./Solution.py")
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
