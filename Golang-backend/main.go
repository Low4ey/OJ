package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/low4ey/OJ/Golang-backend/config"
	"github.com/low4ey/OJ/Golang-backend/routes"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	config, err := config.LoadConfig(".")
	if err != nil {
		fmt.Println("Environment Variable Failed Loading")
		os.Exit(1)
	}
	port := config.PORT
	fmt.Println("And the Port Is : " + port)
	if port == "" {
		port = "8080"
	}

	router := gin.Default()
	routes.SubmissionRoutes(router)
	log.Fatal(router.Run(":" + port))
}
