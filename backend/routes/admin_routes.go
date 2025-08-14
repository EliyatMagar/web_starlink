package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func AdminRoutes(r *gin.RouterGroup) {
	// Public admin routes (no authentication required)
	public := r.Group("/admin")
	{
		public.POST("/signup", controllers.AdminSignup)
		public.POST("/login", controllers.AdminLogin)

		// Blog viewing routes (public)
		public.GET("/blogs", controllers.GetBlogs)
		public.GET("/blogs/:id", controllers.GetBlog)
	}

	// Protected admin routes (require authentication)
	protected := r.Group("/admin")
	protected.Use(middleware.RequireAuth)
	{
		// Dashboard route
		protected.GET("/dashboard", adminDashboard)

		// Blog management routes
		protected.POST("/blogs", controllers.CreateBlog)
		protected.PUT("/blogs/:id", controllers.UpdateBlog)
		protected.DELETE("/blogs/:id", controllers.DeleteBlog)
	}
}

// adminDashboard handles the admin dashboard route
func adminDashboard(c *gin.Context) {
	// Safely get adminID with type checking
	adminIDValue, exists := c.Get("adminID")
	if !exists {
		c.JSON(400, gin.H{"error": "adminID not found in context"})
		return
	}

	var adminID int
	switch v := adminIDValue.(type) {
	case uint:
		adminID = int(v) // Convert uint to int if needed
	case int:
		adminID = v
	default:
		c.JSON(500, gin.H{"error": "invalid adminID type"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Welcome to admin dashboard",
		"adminID": adminID,
		"links": []gin.H{
			{"description": "Manage blogs", "path": "/api/admin/blogs"},
			{"description": "Manage users", "path": "/api/admin/users"},
		},
	})
}
