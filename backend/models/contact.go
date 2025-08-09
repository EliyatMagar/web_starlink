package models

// ContactRequest represents the incoming contact form data
type ContactRequest struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Message string `json:"message" binding:"required"`
}

// ContactResponse represents the API response
type ContactResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
