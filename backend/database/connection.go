package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func ConnectDB() {
	// Get environment variables with defaults
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "5432" // default PostgreSQL port
	}
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	sslMode := os.Getenv("DB_SSLMODE")
	if sslMode == "" {
		sslMode = "require" // safer default for production
	}

	// Two connection string formats - choose one:

	// Option 1: URL format (recommended)
	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s",
		dbUser,
		dbPassword,
		dbHost,
		dbPort,
		dbName,
		sslMode)

	// Option 2: DSN format (what you're currently using)
	// dbURL := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
	//     dbHost, dbPort, dbUser, dbPassword, dbName, sslMode)

	log.Printf("Attempting to connect to database at %s", dbHost)

	var err error
	DB, err = sqlx.Connect("postgres", dbURL)
	if err != nil {
		// Mask password in error logs for security
		maskedURL := fmt.Sprintf("postgres://%s:****@%s:%s/%s?sslmode=%s",
			dbUser, dbHost, dbPort, dbName, sslMode)
		log.Printf("Connection failed. URL: %s", maskedURL)
		log.Fatalf("Database connection error: %v", err)
	}

	// Connection pool settings
	DB.SetMaxOpenConns(25)
	DB.SetMaxIdleConns(25)
	DB.SetConnMaxLifetime(5 * time.Minute)
	DB.SetConnMaxIdleTime(2 * time.Minute)

	// Test connection with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := DB.PingContext(ctx); err != nil {
		log.Fatalf("Database ping failed: %v", err)
	}

	log.Println("✅ Database connected successfully")
}

func CloseDB() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
