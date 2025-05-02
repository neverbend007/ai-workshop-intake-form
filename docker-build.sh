#!/bin/bash
# Load environment variables from .env file
set -a
source .env
set +a

# Build the Docker image with environment variables passed as build-args
docker build \
  --build-arg VITE_RECAPTCHA_SITE_KEY="$VITE_RECAPTCHA_SITE_KEY" \
  --build-arg VITE_WEBHOOK_URL="$VITE_WEBHOOK_URL" \
  --build-arg VITE_WEBHOOK_USERNAME="$VITE_WEBHOOK_USERNAME" \
  --build-arg VITE_WEBHOOK_PASSWORD="$VITE_WEBHOOK_PASSWORD" \
  -t ai-workshop-intake-form .

# Run the container
docker run -d --name ai-workshop-intake-form -p 8080:80 ai-workshop-intake-form