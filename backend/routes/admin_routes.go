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
	adminID := c.MustGet("adminID").(int)
	c.JSON(200, gin.H{
		"message": "Welcome to admin dashboard",
		"adminID": adminID,
		"links": []gin.H{
			{"description": "Manage blogs", "path": "/api/admin/blogs"},
			{"description": "Manage users", "path": "/api/admin/users"},
		},
	})
}
