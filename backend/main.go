package main

import (
	"backend/config"
	"backend/database"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	database.ConnectDB()

	r := gin.Default()

	r.Run(":8080")
}
