package controllers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/low4ey/OJ/Golang-backend/database"
	"github.com/low4ey/OJ/Golang-backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var RoomsCollection *mongo.Collection = database.RecordData(database.Client, "Rooms")

func SearchRoom() gin.HandlerFunc {
	return func(c *gin.Context) {
		var requestBody struct {
			PlayerID string `json:"playerId"`
		}

		if err := c.ShouldBindJSON(&requestBody); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Access the playerId value
		playerId := requestBody.PlayerID
		fmt.Println(playerId)

		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var status = "Open"
		var room models.Room

		filter := bson.M{
			"roomStatus":    status,
			"CurrentPlayer": bson.M{"$lt": 100},
		}

		options := options.FindOne().SetSort(bson.M{"CurrentPlayer": -1})

		err := RoomsCollection.FindOne(ctx, filter, options).Decode(&room)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				// No room found, create a new room
				newRoom := models.Room{
					CurrentPlayer: 0,
					// Set other room properties as needed
				}

				insertResult, err := RoomsCollection.InsertOne(ctx, newRoom)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create a new room"})
					return
				}

				// Get the ID of the newly inserted room
				newRoomID := insertResult.InsertedID.(primitive.ObjectID)

				// Update the room object with the new room's ID
				newRoom.Id = newRoomID

				// Assign the new room to the existing room variable
				room = newRoom
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
				return
			}
		}

	}
}
