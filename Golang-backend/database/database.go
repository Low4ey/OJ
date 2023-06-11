package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/low4ey/OJ/Golang-backend/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB_NAME = "test"

func DBSet() *mongo.Client {
	config, err := config.LoadConfig(".")
	if err != nil {
		fmt.Println("Environment Variable Failed Loading in DB")
		os.Exit(1)
	}
	client, err := mongo.NewClient(options.Client().ApplyURI(config.DB_URI))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Println("Failed to connect to mongodb :(")
		return nil
	}
	fmt.Println("Database Connected")
	return client
}

var Client *mongo.Client = DBSet()

func SubmissionData(client *mongo.Client, collectionName string) *mongo.Collection {
	var collection *mongo.Collection = client.Database(DB_NAME).Collection(collectionName)
	return collection
}
