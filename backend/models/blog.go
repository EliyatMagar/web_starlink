package models

import "time"

type Blog struct {
	ID        int       `db:"id" json:"id"`
	Title     string    `db:"title" json:"title" binding:"required,min=3"`
	Content   string    `db:"content" json:"content" binding:"required,min=10"`
	Image     *string   `db:"image" json:"image"` // Changed to pointer to handle NULL
	AdminID   int       `db:"admin_id" json:"admin_id"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
	// Added for JOIN results
	AdminUsername *string `db:"admin_username" json:"admin_username,omitempty"`
}

type BlogCreateRequest struct {
	Title   string `form:"title" binding:"required,min=3"`
	Content string `form:"content" binding:"required,min=10"`
}

type BlogUpdateRequest struct {
	Title   string `form:"title" binding:"required,min=3"`
	Content string `form:"content" binding:"required,min=10"`
}
