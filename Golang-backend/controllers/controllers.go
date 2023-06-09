package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/low4ey/OJ/Golang-backend/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Submit() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var submission models.Submission
		if err := c.BindJSON(&submission); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		submission.SubmitTime, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		submission.Id = primitive.NewObjectID()
		_, err := SubmissionCollection.InsertOne(ctx, submission)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Something bad happend"})
			return
		}
		defer cancel()
		c.JSON(http.StatusCreated, "Submission Submitted")
	}
}

func GetAllSub() gin.HandlerFunc {

}
func GetSubByQuestionId() gin.HandlerFunc {

}
func GetSubByUserId() gin.HandlerFunc {

}
