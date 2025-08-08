package models

type Admin struct {
	ID       int    `db:"id" json:"id"`
	Username string `db:"username" json:"username" binding:"required,min=3"`
	Email    string `db:"email" json:"email" binding:"required,email"`
	Password string `db:"password" json:"password,omitempty" binding:"required,min=6"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}
