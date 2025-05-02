#!/bin/bash
# Script to build and deploy the Docker container

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}')
fi

# Check for required environment variables
required_vars=(
    "VITE_RECAPTCHA_SITE_KEY"
    "VITE_WEBHOOK_URL"
    "VITE_WEBHOOK_USERNAME" 
    "VITE_WEBHOOK_PASSWORD"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: Environment variable $var is not set. Please check your .env file."
        exit 1
    fi
done

# Build and start the containers
echo "Building and starting Docker containers..."
docker-compose up --build -d

echo "Deployment completed successfully!"
echo "Application is now running at http://localhost:8080"