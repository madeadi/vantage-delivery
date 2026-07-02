package main

import "time"

type DeliveryType string
type DeliveryStatus string

const (
	DeliveryTypeFromKitchen = "from_kitchen"
	DeliveryTypeToKitchen   = "to_kitchen"
)

type Delivery struct {
	ID          string       `json:"id"`
	Type        DeliveryType `json:"type"`
	Phase       string       `json:"phase"`
	IsPhaseDone bool         `json:"is_phase_done"`
	Name        string       `json:"name"`
	Status      string       `json:"status"`

	FailureReason string `json:"failure_reason"`

	UpdatedAt time.Time `json:"updated_at"`
	CreatedAt time.Time `json:"created_at"`

	StartAt time.Time `json:"start_at"`
	EndAt   time.Time `json:"end_at"`
}
