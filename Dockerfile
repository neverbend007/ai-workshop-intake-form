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

# Build the app
RUN npm run build

# Production stage - use Nginx to serve the static files
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Create a folder for docker-entrypoint scripts if it doesn't exist
RUN mkdir -p /docker-entrypoint.d/

# Create runtime config script - ONLY include the public reCAPTCHA site key
RUN echo '#!/bin/sh' > /docker-entrypoint.d/40-config.sh && \
    echo 'CONFIG_PATH=/usr/share/nginx/html/config.js' >> /docker-entrypoint.d/40-config.sh && \
    echo 'echo "window.ENV = {" > $CONFIG_PATH' >> /docker-entrypoint.d/40-config.sh && \
    echo 'echo "  RECAPTCHA_SITE_KEY: \"$VITE_RECAPTCHA_SITE_KEY\"" >> $CONFIG_PATH' >> /docker-entrypoint.d/40-config.sh && \
    echo 'echo "}" >> $CONFIG_PATH' >> /docker-entrypoint.d/40-config.sh && \
    chmod +x /docker-entrypoint.d/40-config.sh

# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]