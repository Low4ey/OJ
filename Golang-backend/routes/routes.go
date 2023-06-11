package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/low4ey/OJ/Golang-backend/controllers"
)

func SubmissionRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/submit", controllers.Submit())
	incomingRoutes.GET("/getallsubmission", controllers.GetAllSub())
	incomingRoutes.GET("/getsubmission/question/:questionId", controllers.GetSubByQuestionId())
	incomingRoutes.GET("/getsubmission/user/:userId", controllers.GetSubByUserId())
}
