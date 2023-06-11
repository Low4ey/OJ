package middleware

import "fmt"

func ExecuteCode(codeBody string, language string) (string, error) {
	switch language {
	case "C++":
		return RunCpp(codeBody)
	case "Python":
		return RunPython(codeBody)
	case "Java":
		return RunJava(codeBody)
	default:
		return "", fmt.Errorf("unsupported language: %s", language)
	}
}
