package main

import (
	"time"

	"github.com/google/uuid"
)

type DeliveryService struct {
	mr DeliveryRepository
}

type DeliveryRepository interface {
	CreateDelivery(delivery *Delivery) error
	FindDeliveryByID(id string) (Delivery, error)
	LatestDelivery() ([]Delivery, error)
	UpdateDelivery(delivery Delivery) error
}

func NewSPSService(mr DeliveryRepository) *DeliveryService {
	return &DeliveryService{mr: mr}
}

func (s *DeliveryService) Create(missionType DeliveryType) (Delivery, error) {
	d := Delivery{
		ID:        uuid.New().String(),
		Type:      missionType,
		Status:    "created",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	if err := s.mr.CreateDelivery(&d); err != nil {
		return Delivery{}, err
	}

	return d, nil
}

func (s *DeliveryService) FindByID(id string) (Delivery, error) {
	return s.mr.FindDeliveryByID(id)
}

func (s *DeliveryService) List() ([]Delivery, error) {
	return s.mr.LatestDelivery()
}
