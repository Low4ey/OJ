package controllers

import (
	"context"
	"fmt"
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

func Submit() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 1000*time.Second)
		defer cancel()

		var submission models.Submission
		if err := c.BindJSON(&submission); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		testcases, testCaserr := getTestCases("http://js_backend:5005/api/getTestCase/" + *submission.QuestionId)
		if testCaserr != nil {
			fmt.Println("Error in testcase route")
			c.JSON(http.StatusBadRequest, gin.H{"error": testCaserr.Error()})
			return
		}

		if err := middleware.WriteOutputToFile(testcases); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		submission.SubmitTime = time.Now()

		outcome, status, codeErr := middleware.ExecuteCode(*submission.Code, *submission.Language, testcases)
		if codeErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": codeErr.Error()})
			return
		}
		fmt.Println(outcome, " ", status)
		submission.Status = &status
		submission.LastExecutedIndex = outcome
		submission.Id = primitive.NewObjectID()

		_, err := SubmissionCollection.InsertOne(ctx, submission)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert submission"})
			return
		}

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
