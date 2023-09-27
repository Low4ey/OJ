package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Room struct {
	Id            primitive.ObjectID `json:"_id" bson:"_id"`
	Capacity      int                `json:"Capacity" default:"100"`
	CurrentPlayer int                `json:"output" `
	Players       []PlayerMatchStat  `json:"players"`
	RoomStatus    *string            `json:"roomStatus" `
	OpenTime      time.Time          `json:"openTime"`
	CloseTime     time.Time          `json:"closeTime"`
}
