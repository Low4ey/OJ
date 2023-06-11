package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/low4ey/OJ/Golang-backend/database"
	"github.com/low4ey/OJ/Golang-backend/middleware"
	"github.com/low4ey/OJ/Golang-backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var SubmissionCollection *mongo.Collection = database.SubmissionData(database.Client, "Submission")

type Application struct {
	submissionCollection *mongo.Collection
}

func NewApplication(subCollection *mongo.Collection) *Application {
	return &Application{
		submissionCollection: subCollection,
	}
}
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
		codeOutput, codeErr := middleware.ExecuteCode(*submission.Code, *submission.Language)
		if codeErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": codeErr.Error()})
			return
		}
		submission.Status = &codeOutput
		submission.Id = primitive.NewObjectID()
		_, err := SubmissionCollection.InsertOne(ctx, submission)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Something bad happened"})
			return
		}
		defer cancel()
		c.JSON(http.StatusCreated, gin.H{"data": submission})
	}
}

func GetAllSub() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		cursor, err := SubmissionCollection.Find(ctx, bson.M{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
			return
		}

		defer cursor.Close(ctx)

		var submissions []models.Submission
		if err := cursor.All(ctx, &submissions); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
			return
		}

		c.JSON(http.StatusOK, submissions)
	}
}

func GetSubByQuestionId() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		quesId := c.Param("questionId")

		cursor, err := SubmissionCollection.Find(ctx, bson.M{"questionid": quesId})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
			return
		}
		defer cursor.Close(ctx)

		var submissions []models.Submission
		if err := cursor.All(ctx, &submissions); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
			return
		}
		c.JSON(http.StatusOK, submissions)
	}
}

func GetSubByUserId() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		userID := c.Param("userId")

		cursor, err := SubmissionCollection.Find(ctx, bson.M{"userid": userID})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
			return
		}

		defer cursor.Close(ctx)

		var submissions []models.Submission
		if err := cursor.All(ctx, &submissions); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
			return
		}

		c.JSON(http.StatusOK, submissions)
	}
}
