package utils

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"reflect"
	"time"

	"github.com/low4ey/OJ/Golang-backend/models"
)

func CreateCSVFile(data []models.Submission, filePath string) error {
	// Create the output CSV file
	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	// Create a CSV writer
	writer := csv.NewWriter(file)

	// Count the number of fields in Submission struct
	numFields := reflect.TypeOf(models.Submission{}).NumField()

	// Write column headers
	headers := make([]string, numFields)
	fields := reflect.TypeOf(models.Submission{})

	for i := 0; i < numFields; i++ {
		headers[i] = fields.Field(i).Tag.Get("json")
	}

	writer.Write(headers)

	// Write data rows
	for _, submission := range data {
		row := make([]string, numFields)
		values := reflect.ValueOf(submission)
		// types := reflect.TypeOf(submission)

		for i := 0; i < numFields; i++ {
			field := values.Field(i)
			value := field.Interface()

			switch v := value.(type) {
			case *string:
				if v != nil {
					row[i] = *v
				} else {
					row[i] = ""
				}
			case *time.Time:
				if v != nil {
					row[i] = v.Format("2006-01-02 15:04:05")
				} else {
					row[i] = ""
				}
			default:
				row[i] = fmt.Sprintf("%v", value)
			}
		}

		writer.Write(row)
	}

	writer.Flush()
	if err := writer.Error(); err != nil {
		return err
	}

	log.Println("Data exported to", filePath)

	return nil
}
