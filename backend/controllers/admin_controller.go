package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func AdminSignup(c *gin.Context) {
	var admin models.Admin
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	// Check if email already exists
	var count int
	err := database.DB.Get(&count, "SELECT COUNT(*) FROM admins WHERE email=$1", admin.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email already registered"})
		return
	}

	// Hash password with proper error handling
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
		return
	}
	admin.Password = string(hashedPassword)

	// Save to DB with better error handling
	_, err = database.DB.NamedExec(`
		INSERT INTO admins (username, email, password) 
		VALUES (:username, :email, :password)`, &admin)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to register admin",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Admin registered successfully"})
}

func AdminLogin(c *gin.Context) {
	var input models.LoginRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Login - Input error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	log.Printf("Login attempt for email: %s", input.Email)

	var admin models.Admin
	err := database.DB.Get(&admin, "SELECT id, username, email, password FROM admins WHERE email = $1", input.Email)
	if err != nil {
		log.Printf("Login - Database error: %v", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	log.Printf("Found admin: %+v", admin)

	err = bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(input.Password))
	if err != nil {
		log.Printf("Login - Password mismatch: %v", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := utils.GenerateToken(admin.ID)
	if err != nil {
		log.Printf("Login - Token generation error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	log.Printf("Login successful for admin ID: %d", admin.ID)
	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"admin": gin.H{
			"id":    admin.ID,
			"email": admin.Email,
		},
	})
}
