package controllers

import (
	"backend/database"
	"backend/models"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const uploadDir = "./uploads"

func init() {
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		os.Mkdir(uploadDir, 0755)
	}
}

func CreateBlog(c *gin.Context) {
	adminID := c.MustGet("adminID").(int)

	var blogRequest models.BlogCreateRequest
	if err := c.ShouldBind(&blogRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Image is required"})
		return
	}

	ext := filepath.Ext(file.Filename)
	newFilename := uuid.New().String() + ext
	filePath := filepath.Join(uploadDir, newFilename)

	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	blog := models.Blog{
		Title:     blogRequest.Title,
		Content:   blogRequest.Content,
		Image:     &newFilename, // Store as pointer
		AdminID:   adminID,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	_, err = database.DB.NamedExec(`
        INSERT INTO blogs (title, content, image, admin_id, created_at, updated_at)
        VALUES (:title, :content, :image, :admin_id, :created_at, :updated_at)`,
		blog)

	if err != nil {
		os.Remove(filePath)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Blog created successfully"})
}

func GetBlogs(c *gin.Context) {
	var blogs []models.Blog

	err := database.DB.Select(&blogs, `
        SELECT b.*, a.username as admin_username 
        FROM blogs b
        LEFT JOIN admins a ON b.admin_id = a.id
        ORDER BY b.created_at DESC`)
	if err != nil {
		log.Printf("Database error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch blogs",
			"details": err.Error(),
		})
		return
	}

	// Generate full image URLs
	for i := range blogs {
		if blogs[i].Image != nil {
			imagePath := "/uploads/" + *blogs[i].Image
			blogs[i].Image = &imagePath
		}
	}

	c.JSON(http.StatusOK, blogs)
}

func GetBlog(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid ID format",
			"details": "ID must be a number",
		})
		return
	}

	log.Printf("Fetching blog with ID: %d", id)

	var blog models.Blog
	err = database.DB.Get(&blog, `
        SELECT b.*, a.username as admin_username 
        FROM blogs b
        LEFT JOIN admins a ON b.admin_id = a.id
        WHERE b.id = $1`, id)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": fmt.Sprintf("Blog with ID %d not found", id),
			})
		} else {
			log.Printf("Database error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to fetch blog",
			})
		}
		return
	}

	if blog.Image != nil {
		imagePath := "/uploads/" + *blog.Image
		blog.Image = &imagePath
	}

	c.JSON(http.StatusOK, blog)
}

func UpdateBlog(c *gin.Context) {
	adminID := c.MustGet("adminID").(int)
	id := c.Param("id")

	var blogAdminID int
	err := database.DB.Get(&blogAdminID, "SELECT admin_id FROM blogs WHERE id = $1", id)
	if err != nil || blogAdminID != adminID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to update this blog"})
		return
	}

	var blogRequest models.BlogUpdateRequest
	if err := c.ShouldBind(&blogRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var currentBlog models.Blog
	err = database.DB.Get(&currentBlog, "SELECT * FROM blogs WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	updateData := map[string]interface{}{
		"title":    blogRequest.Title,
		"content":  blogRequest.Content,
		"id":       id,
		"admin_id": adminID,
	}

	file, err := c.FormFile("image")
	if err == nil {
		ext := filepath.Ext(file.Filename)
		newFilename := uuid.New().String() + ext
		filePath := filepath.Join(uploadDir, newFilename)

		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}

		updateData["image"] = newFilename

		// Delete old image if exists
		if currentBlog.Image != nil && *currentBlog.Image != "" {
			oldFilePath := filepath.Join(uploadDir, *currentBlog.Image)
			os.Remove(oldFilePath)
		}
	} else {
		// Keep existing image
		if currentBlog.Image != nil {
			updateData["image"] = *currentBlog.Image
		} else {
			updateData["image"] = nil
		}
	}

	_, err = database.DB.NamedExec(`
        UPDATE blogs 
        SET title = :title, content = :content, image = :image, updated_at = NOW()
        WHERE id = :id AND admin_id = :admin_id`,
		updateData)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update blog"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog updated successfully"})
}

func DeleteBlog(c *gin.Context) {
	adminID := c.MustGet("adminID").(int)
	id := c.Param("id")

	var blogAdminID int
	err := database.DB.Get(&blogAdminID, "SELECT admin_id FROM blogs WHERE id = $1", id)
	if err != nil || blogAdminID != adminID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not authorized to delete this blog"})
		return
	}

	var blog models.Blog
	err = database.DB.Get(&blog, "SELECT * FROM blogs WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	_, err = database.DB.Exec("DELETE FROM blogs WHERE id = $1 AND admin_id = $2", id, adminID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete blog"})
		return
	}

	if blog.Image != nil && *blog.Image != "" {
		filePath := filepath.Join(uploadDir, *blog.Image)
		os.Remove(filePath)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog deleted successfully"})
}
