package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PlayerMatchStat struct {
	Id              primitive.ObjectID `json:"_id" bson:"_id"`
	PlayerId        primitive.ObjectID `json:"playerId"`
	JoinTime        time.Time          `json:"joinTime"`
	LeaveTime       time.Time          `json:"leaveTime"`
	RoomId          primitive.ObjectID `json:"roomId"`
	SolvedQuestions []Question         `json:"solvedQuestions"`
}

type Question struct {
	QuestionId primitive.ObjectID `json:"questionId"`
	IsSolved   bool               `json:"isSolved"`
	Score      int                `json:"score"`
}
