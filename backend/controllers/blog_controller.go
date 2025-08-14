package controllers

import (
	"backend/database"
	"backend/models"
	"errors"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const (
	uploadDir      = "./uploads"
	maxUploadSize  = 8 << 20 // 8 MB
	allowedFormats = ".jpg,.jpeg,.png,.gif"
)

func init() {
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		panic("Failed to create upload directory: " + err.Error())
	}
}

// CreateBlog creates a new blog post
func CreateBlog(c *gin.Context) {
	adminID, err := getAdminID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin authentication required"})
		return
	}

	if err := c.Request.ParseMultipartForm(maxUploadSize); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File too large (max 8MB)"})
		return
	}

	// Get form values directly instead of using ShouldBind
	title := c.PostForm("title")
	content := c.PostForm("content")

	// Validate required fields
	if title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}
	if content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Content is required"})
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Image is required"})
		return
	}

	ext := filepath.Ext(file.Filename)
	if !isAllowedExtension(ext) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file format. Allowed: " + allowedFormats})
		return
	}

	newFilename := uuid.New().String() + ext
	filePath := filepath.Join(uploadDir, newFilename)

	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	// Create blog struct directly with validated data
	blog := models.Blog{
		Title:     title,
		Content:   content,
		Image:     &newFilename,
		AdminID:   adminID,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	if err := database.DB.Create(&blog).Error; err != nil {
		os.Remove(filePath)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Blog created successfully",
		"blog":    blog,
	})
}

// GetBlogs returns all blogs
func GetBlogs(c *gin.Context) {
	var blogs []models.Blog
	if err := database.DB.Preload("Admin").Order("created_at DESC").Find(&blogs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blogs"})
		return
	}

	for i := range blogs {
		if blogs[i].Image != nil {
			imagePath := "/uploads/" + *blogs[i].Image
			blogs[i].Image = &imagePath
		}
	}

	c.JSON(http.StatusOK, blogs)
}

// GetBlog returns a single blog by ID
func GetBlog(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var blog models.Blog
	if err := database.DB.Preload("Admin").First(&blog, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	if blog.Image != nil {
		imagePath := "/uploads/" + *blog.Image
		blog.Image = &imagePath
	}

	c.JSON(http.StatusOK, blog)
}

// UpdateBlog updates an existing blog
func UpdateBlog(c *gin.Context) {
	adminID, err := getAdminID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin authentication required"})
		return
	}

	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var blog models.Blog
	if err := database.DB.First(&blog, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	if blog.AdminID != adminID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to update this blog"})
		return
	}

	var updateData models.Blog
	if err := c.ShouldBind(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file, err := c.FormFile("image")
	if err == nil {
		ext := filepath.Ext(file.Filename)
		if !isAllowedExtension(ext) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file format"})
			return
		}

		newFilename := uuid.New().String() + ext
		filePath := filepath.Join(uploadDir, newFilename)

		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}

		if blog.Image != nil && *blog.Image != "" {
			oldPath := filepath.Join(uploadDir, *blog.Image)
			if err := os.Remove(oldPath); err != nil && !os.IsNotExist(err) {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove old image"})
				return
			}
		}

		updateData.Image = &newFilename
	} else {
		updateData.Image = blog.Image
	}

	updateData.UpdatedAt = time.Now()

	if err := database.DB.Model(&blog).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update blog"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Blog updated successfully",
		"blog":    blog,
	})
}

// DeleteBlog deletes a blog post
func DeleteBlog(c *gin.Context) {
	adminID, err := getAdminID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin authentication required"})
		return
	}

	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var blog models.Blog
	if err := database.DB.First(&blog, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	if blog.AdminID != adminID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to delete this blog"})
		return
	}

	if err := database.DB.Delete(&blog).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete blog"})
		return
	}

	if blog.Image != nil && *blog.Image != "" {
		imagePath := filepath.Join(uploadDir, *blog.Image)
		if err := os.Remove(imagePath); err != nil && !os.IsNotExist(err) {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Blog deleted but failed to remove image",
				"error":   err.Error(),
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog deleted successfully"})
}

func getAdminID(c *gin.Context) (uint, error) {
	adminIDValue, exists := c.Get("adminID")
	if !exists {
		return 0, errors.New("adminID not found")
	}

	adminID, ok := adminIDValue.(uint)
	if !ok {
		return 0, errors.New("invalid adminID type")
	}

	return adminID, nil
}

func isAllowedExtension(ext string) bool {
	allowed := map[string]bool{
		".jpg":  true,
		".jpeg": true,
		".png":  true,
		".gif":  true,
	}
	return allowed[ext]
}
