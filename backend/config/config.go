package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Warning: Could not load .env file - using system environment variables")
	}

	// Validate required environment variables
	requiredVars := []string{
		"DB_HOST", "DB_PORT", "DB_USER",
		"DB_PASSWORD", "DB_NAME", "JWT_SECRET",
	}

	for _, envVar := range requiredVars {
		if os.Getenv(envVar) == "" {
			log.Fatalf("Required environment variable %s is not set", envVar)
		}
	}
}
