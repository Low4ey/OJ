package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Submission struct {
	Id                primitive.ObjectID `json:"_id" bson:"_id"`
	QuestionId        *string            `json:"questionId" validate:"required"`
	UserID            *string            `json:"userId" validate:"required"`
	Language          *string            `json:"language"`
	Code              *string            `json:"code" validate:"required"`
	SubmitTime        time.Time          `json:"submitTime"`
	Status            *string            `json:"status"`
	LastExecutedIndex int                `json:"lastExecutedIndex"`
}
