package middleware

import (
	"backend/utils"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func RequireAuth(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	if tokenString == authHeader {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Bearer token required"})
		return
	}

	claims, err := utils.ValidateToken(tokenString)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token: " + err.Error()})
		return
	}

	// Safely extract adminID from claims
	adminIDValue, ok := claims["admin_id"]
	if !ok {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Token missing admin_id"})
		return
	}

	// Convert to uint properly
	var adminID uint
	switch v := adminIDValue.(type) {
	case float64:
		adminID = uint(v)
	case int:
		adminID = uint(v)
	case string:
		id, err := strconv.ParseUint(v, 10, 64)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid admin_id format in token",
			})
			return
		}
		adminID = uint(id)
	default:
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "Unsupported admin_id type in token",
		})
		return
	}

	c.Set("adminID", adminID)
	c.Next()
}
