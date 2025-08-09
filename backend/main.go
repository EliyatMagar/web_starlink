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

func cleanupOrigins(origins []string) []string {
	var cleaned []string
	for _, origin := range origins {
		cleaned = append(cleaned, strings.TrimSpace(strings.TrimRight(origin, "/")))
	}
	return cleaned
}

func main() {
	// Load environment variables
	config.LoadEnv()
	validateEnvVars()

	// Log environment variables for debugging
	log.Printf("Allowed Origins: %v", strings.Split(os.Getenv("ALLOWED_ORIGINS"), ","))
	log.Printf("Server running in %s mode", os.Getenv("GIN_MODE"))

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

	// Enhanced request logging middleware
	router.Use(func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		query := c.Request.URL.RawQuery

		c.Next()

		latency := time.Since(start)
		status := c.Writer.Status()
		clientIP := c.ClientIP()
		method := c.Request.Method

		log.Printf("[GIN] %3d | %13v | %15s | %-7s %s%s",
			status,
			latency,
			clientIP,
			method,
			path,
			ternary(query != "", "?"+query, ""),
		)
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
		allowedOrigins := cleanupOrigins(strings.Split(os.Getenv("ALLOWED_ORIGINS"), ","))
		allowedMethods := strings.Split(os.Getenv("ALLOWED_METHODS"), ",")
		allowedHeaders := strings.Split(os.Getenv("ALLOWED_HEADERS"), ",")

		for i := range allowedMethods {
			allowedMethods[i] = strings.TrimSpace(allowedMethods[i])
		}
		for i := range allowedHeaders {
			allowedHeaders[i] = strings.TrimSpace(allowedHeaders[i])
		}

		router.Use(cors.New(cors.Config{
			AllowOrigins:     allowedOrigins,
			AllowMethods:     allowedMethods,
			AllowHeaders:     allowedHeaders,
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}))
	}

	// API Documentation Route
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "Starlink API",
			"version": "1.0",
			"routes": gin.H{
				"health":  "/health",
				"admin":   "/api/admin",
				"uploads": "/uploads",
				"swagger": "/swagger/index.html",
			},
		})
	})

	// Health check endpoint with DB verification
	router.GET("/health", func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()

		if err := database.DB.PingContext(ctx); err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{
				"status":  "unhealthy",
				"error":   err.Error(),
				"details": "Database connection failed",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"details": "All systems operational",
		})
	})

	// Setup API routes
	api := router.Group("/api")
	{
		// Admin routes
		routes.AdminRoutes(api)

		// Add other route groups here
		// routes.UserRoutes(api)
		// routes.AuthRoutes(api)
	}

	// Serve static files (should come after API routes)
	router.Static("/uploads", "./uploads")

	// Set trusted proxies if configured
	if trustedProxies := os.Getenv("TRUSTED_PROXIES"); trustedProxies != "" {
		router.SetTrustedProxies(strings.Split(trustedProxies, ","))
	}

	// Print all registered routes
	for _, route := range router.Routes() {
		log.Printf("Registered Route: %-6s %s", route.Method, route.Path)
	}

	// Get port from env or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Create HTTP server for graceful shutdown
	server := &http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	// Graceful shutdown setup
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// Run server in goroutine
	go func() {
		log.Printf("Server starting on port %s", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Block until signal is received
	<-quit
	log.Println("Shutting down server...")

	// Create context with timeout for shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Shutdown the server gracefully
	if err := server.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exited properly")
}

// Helper function for clean ternary operations
func ternary(condition bool, trueVal, falseVal string) string {
	if condition {
		return trueVal
	}
	return falseVal
}
