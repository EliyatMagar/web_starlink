package models

import "time"

type Blog struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Title     string    `gorm:"size:255;not null" json:"title"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	Image     *string   `json:"image"`
	AdminID   uint      `gorm:"not null" json:"admin_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Admin     Admin     `gorm:"foreignKey:AdminID"`
}
