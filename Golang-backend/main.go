package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/low4ey/OJ/Golang-backend/routes"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := gin.Default()
	routes.SubmissionRoutes(router)
	log.Fatal(router.Run(":" + port))
}
