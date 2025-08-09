// routes/admin_routes.go
package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func AdminRoutes(r *gin.Engine) {
	api := r.Group("/api")

	// Serve static files from uploads directory
	api.Static("/uploads", "./uploads")

	// Public routes
	api.POST("/admin/signup", controllers.AdminSignup)
	api.POST("/admin/login", controllers.AdminLogin)
	api.GET("/blogs", controllers.GetBlogs)
	api.GET("/blogs/:id", controllers.GetBlog)

	// Protected admin routes
	admin := api.Group("/admin")
	admin.Use(middleware.RequireAuth)
	{
		admin.GET("/dashboard", func(c *gin.Context) {
			adminID := c.MustGet("adminID").(int)
			c.JSON(200, gin.H{"message": "Welcome to admin dashboard", "adminID": adminID})
		})

		// Blog management routes
		admin.POST("/blogs", controllers.CreateBlog)
		admin.PUT("/blogs/:id", controllers.UpdateBlog)
		admin.DELETE("/blogs/:id", controllers.DeleteBlog)
	}
}
