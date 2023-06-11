package middleware

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os/exec"
)

func RunJava(codeBody string) (string, error) {
	// Write the code to a Java file
	err := ioutil.WriteFile("./Solution.java", []byte(codeBody), 0644)
	if err != nil {
		return "", fmt.Errorf("failed to write code to file: %v", err)
	}

	err = executeJavaFile("./Solution.java")
	if err != nil {
		return "", fmt.Errorf("failed to execute Java file: %v", err)
	}

	output, err := runJavaFile()
	if err != nil {
		return "", fmt.Errorf("failed to run Java file: %v", err)
	}

	return output, nil
}

func executeJavaFile(filePath string) error {
	cmd := exec.Command("javac", filePath) // Compile the Java file using javac
	errOutput := &bytes.Buffer{}           // Buffer to capture the error output
	cmd.Stderr = errOutput                 // Attach the buffer to cmd.Stderr

	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("failed to compile Java file: %v\n%s", err, errOutput.String())
	}

	return nil
}

func runJavaFile() (string, error) {
	cmd := exec.Command("java", "Solution") // Execute the compiled Java file
	outputBuffer := &bytes.Buffer{}         // Buffer to capture the output
	cmd.Stdout = outputBuffer               // Attach the buffer to cmd.Stdout
	errOutput := &bytes.Buffer{}            // Buffer to capture the error output
	cmd.Stderr = errOutput                  // Attach the buffer to cmd.Stderr

	err := cmd.Run()
	if err != nil {
		return "", fmt.Errorf("failed to run Java file: %v\n%s", err, errOutput.String())
	}

	output := outputBuffer.String()
	return output, nil
}
