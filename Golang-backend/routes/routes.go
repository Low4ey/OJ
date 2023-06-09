package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/low4ey/OJ/Golang-backend/controllers"
)

func SubmissionRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/submit", controllers.Submit())
	incomingRoutes.GET("/getallsubmission", controllers.GetAllSubmission())
	incomingRoutes.GET("/getsubmission", controllers.GetSubmissionByQuestionId())
	incomingRoutes.GET("/getsubmission", controllers.GetSubmissionByUserId())

}
