.PHONY: help mission fe

help: ## Show this help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

mission: ## Run the AV delivery service with hot reload (air)
	cd cmd/avdelivery && air

fe: ## Run the frontend development server
	cd ui && npm run dev
