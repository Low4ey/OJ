package middleware

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os/exec"
)

func RunPython(codeBody string) (string, error) {
	// Write the code to a Python file
	err := ioutil.WriteFile("./solution.py", []byte(codeBody), 0644)
	if err != nil {
		return "", fmt.Errorf("failed to write code to file: %v", err)
	}

	output, err := executePythonFile("./solution.py")
	if err != nil {
		return "", fmt.Errorf("failed to execute Python file: %v", err)
	}

	return output, nil
}

func executePythonFile(filePath string) (string, error) {
	cmd := exec.Command("python", filePath) // Execute the Python file
	outputBuffer := &bytes.Buffer{}         // Buffer to capture the output
	cmd.Stdout = outputBuffer               // Attach the buffer to cmd.Stdout
	errOutput := &bytes.Buffer{}            // Buffer to capture the error output
	cmd.Stderr = errOutput                  // Attach the buffer to cmd.Stderr

	err := cmd.Run()
	if err != nil {
		return "", fmt.Errorf("failed to execute Python file: %v\n%s", err, errOutput.String())
	}

	output := outputBuffer.String()
	return output, nil
}
