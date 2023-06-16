package middleware

import (
	"fmt"

	"github.com/low4ey/OJ/Golang-backend/models"
)

func ExecuteCode(codeBody string, language string, testCases []models.TestCase) (int, string, error) {
	switch language {
	case "C++":
		return RunCpp(codeBody, testCases)
	case "Python":
		return RunPython(codeBody, testCases)
	case "Java":
		return RunJava(codeBody, testCases)
	default:
		return -1, "", fmt.Errorf("unsupported language: %s", language)
	}
}
