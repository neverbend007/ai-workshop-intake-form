# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Environment variables needed at build time for Vite to replace in the code
ARG VITE_RECAPTCHA_SITE_KEY
ARG VITE_WEBHOOK_URL
ARG VITE_WEBHOOK_USERNAME
ARG VITE_WEBHOOK_PASSWORD

ENV VITE_RECAPTCHA_SITE_KEY=${VITE_RECAPTCHA_SITE_KEY}
ENV VITE_WEBHOOK_URL=${VITE_WEBHOOK_URL}
ENV VITE_WEBHOOK_USERNAME=${VITE_WEBHOOK_USERNAME}
ENV VITE_WEBHOOK_PASSWORD=${VITE_WEBHOOK_PASSWORD}

# Build the app
RUN npm run build

# Production stage - use Nginx to serve the static files
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]