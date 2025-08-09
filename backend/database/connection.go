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
	sslmode := os.Getenv("DB_SSLMODE")
	if sslmode == "" {
		sslmode = "disable" // default to disable for local dev
	}

	dbURL := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s sslrootcert=%s connect_timeout=10",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		sslmode,
		"https://letsencrypt.org/certs/isrgrootx1.pem", // Render's CA
	)

	// Debug logging
	log.Printf("Connecting to PostgreSQL at: %s", os.Getenv("DB_HOST"))

	var err error
	DB, err = sqlx.Connect("postgres", dbURL)
	if err != nil {
		log.Printf("Connection failed. URL: postgres://%s@%s:%s/%s?sslmode=%s",
			os.Getenv("DB_USER"), os.Getenv("DB_HOST"), os.Getenv("DB_PORT"),
			os.Getenv("DB_NAME"), sslmode)
		log.Fatal("Database connection error: ", err)
	}

	// Pool settings (your existing code is good)
	DB.SetMaxOpenConns(25)
	DB.SetMaxIdleConns(25)
	DB.SetConnMaxLifetime(5 * time.Minute)

	// Test connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := DB.PingContext(ctx); err != nil {
		log.Fatal("Database ping failed: ", err)
	}

	log.Println("Database connected successfully")
}

func CloseDB() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
