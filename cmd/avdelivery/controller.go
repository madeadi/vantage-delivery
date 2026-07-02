package main

import (
	"encoding/json"
	"errors"
	"net/http"
)

// DeliveryStarter starts the mission handler registered for a delivery's type.
type DeliveryStarter interface {
	StartDelivery(delivery Delivery) error
}

type Controller struct {
	s       *DeliveryService
	starter DeliveryStarter
}

func NewController(s *DeliveryService, starter DeliveryStarter) *Controller {
	return &Controller{s: s, starter: starter}
}

func (c *Controller) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("POST /deliveries", c.handleCreateDelivery)
	mux.HandleFunc("GET /deliveries", c.handleListDeliveries)
	mux.HandleFunc("GET /deliveries/{id}", c.handleFindDelivery)
	mux.HandleFunc("/", c.home)
}

func (c *Controller) home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "sps_mission is running"})
}

type createMissionRequest struct {
	ID      string       `json:"id"`
	Type    DeliveryType `json:"type"`
	RobotID string       `json:"robot_id"`
}

func (c *Controller) handleCreateDelivery(w http.ResponseWriter, r *http.Request) {
	var body createMissionRequest
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	delivery, err := c.s.Create(body.Type)
	if err != nil {
		http.Error(w, "failed to create delivery", http.StatusInternalServerError)
		return
	}

	if err := c.starter.StartDelivery(delivery); err != nil {
		http.Error(w, "failed to start delivery: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(delivery)
}

func (c *Controller) handleListDeliveries(w http.ResponseWriter, r *http.Request) {
	deliveries, err := c.s.List()
	if err != nil {
		http.Error(w, "failed to list deliveries", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(deliveries)
}

func (c *Controller) handleFindDelivery(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	delivery, err := c.s.FindByID(id)
	if err != nil {
		if errors.Is(err, ErrDeliveryNotFound) {
			http.Error(w, "delivery not found", http.StatusNotFound)
			return
		}
		http.Error(w, "failed to find delivery", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(delivery)
}
