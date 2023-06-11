package middleware

import (
	"bufio"
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

func RunCpp(codeBody string) (string, error) {
	err := ioutil.WriteFile("./solution.cpp", []byte(codeBody), 0644)
	if err != nil {
		return "", fmt.Errorf("failed to write code to file: %v", err)
	}

	err = executeCppFile("./solution.cpp")
	if err != nil {
		return "", fmt.Errorf("failed to execute C++ file: %v", err)
	}

	output, err := runExecutable()
	if err != nil {
		return "", fmt.Errorf("failed to run executable: %v", err)
	}

	return output, nil
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

func runExecutable() (string, error) {
	cmd := exec.Command("./a.out") // Execute the compiled executable
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("failed to run executable: %v\n%s", err, string(output))
	}

	return string(output), nil
}

func compareFile(file_one string, file_two string) (bool, error) {
	f1, err := os.Open(file_one)
	if err != nil {
		return false, err
	}
	defer f1.Close()

	// Open the second file
	f2, err := os.Open(file_two)
	if err != nil {
		return false, err
	}
	defer f2.Close()

	// Create a scanner to read the file line by line
	scanner1 := bufio.NewScanner(f1)
	scanner2 := bufio.NewScanner(f2)

	// Iterate over each line and compare them
	for scanner1.Scan() && scanner2.Scan() {
		line1 := scanner1.Text()
		line2 := scanner2.Text()

		// Compare the lines
		if line1 != line2 {
			return false, nil
		}
	}

	// Check if there are any remaining lines in either file
	if scanner1.Scan() || scanner2.Scan() {
		return false, nil
	}

	// Files are identical
	return true, nil
}
