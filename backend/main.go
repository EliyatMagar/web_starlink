package main

import (
	"backend/config"
	"backend/database"
	"backend/routes"
	"backend/utils"
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func validateEnvVars() {
	required := []string{
		"ALLOWED_ORIGINS",
		"ALLOWED_METHODS",
		"ALLOWED_HEADERS",
		"JWT_SECRET",
		"DB_HOST",
		"DB_USER",
		"DB_PASSWORD",
		"DB_NAME",
	}

	for _, key := range required {
		if os.Getenv(key) == "" {
			log.Fatalf("Required environment variable %s is not set", key)
		}
	}
}

func main() {
	// Load environment variables
	config.LoadEnv()
	validateEnvVars()

	// Initialize database
	database.ConnectDB()
	defer func() {
		if err := database.CloseDB(); err != nil {
			log.Printf("Error closing database connection: %v", err)
		}
	}()

	// Initialize JWT
	utils.InitJWT()

	// Set Gin mode based on environment
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create Gin router
	router := gin.Default()

	// Request logging
	router.Use(func(c *gin.Context) {
		start := time.Now()
		c.Next()
		latency := time.Since(start)
		log.Printf("%s %s %d %v", c.Request.Method, c.Request.URL.Path, c.Writer.Status(), latency)
	})

	// CORS configuration
	if os.Getenv("GIN_MODE") != "release" {
		router.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"*"},
			AllowMethods:     []string{"*"},
			AllowHeaders:     []string{"*"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}))
	} else {
		router.Use(cors.New(cors.Config{
			AllowOrigins:     strings.Split(os.Getenv("ALLOWED_ORIGINS"), ","),
			AllowMethods:     strings.Split(os.Getenv("ALLOWED_METHODS"), ","),
			AllowHeaders:     strings.Split(os.Getenv("ALLOWED_HEADERS"), ","),
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}))
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		if err := database.DB.Ping(); err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"status": "unhealthy"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "healthy"})
	})

	// Static files
	router.Static("/uploads", "./uploads")

	// Set trusted proxies
	if trustedProxies := os.Getenv("TRUSTED_PROXIES"); trustedProxies != "" {
		router.SetTrustedProxies(strings.Split(trustedProxies, ","))
	}

	// Setup routes
	routes.AdminRoutes(router)

	// Configure server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := &http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	// Graceful shutdown setup
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		log.Printf("Server starting on port %s", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal
	<-quit
	log.Println("Shutting down server...")

	// Create shutdown context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exited properly")
}
