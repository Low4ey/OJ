package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TestCase struct {
	Id        primitive.ObjectID `json:"_id" bson:"_id"`
	Testcase  *string            `json:"testCase" `
	Output    *string            `json:"output" `
	CreatedBy *string            `json:"createdBy"`
	ProblemId *string            `json:"problemId" `
	Approved  bool               `json:"approved"`
}
