#!/bin/bash

# Deploy script for AIverse
echo "🚀 Deploying AIverse..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it from .env.prod.example"
    exit 1
fi

# Load environment variables
source .env

# Build and start services
echo "📦 Building and starting services..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."
docker-compose -f docker-compose.prod.yml ps

# Show logs
echo "📋 Recent logs:"
docker-compose -f docker-compose.prod.yml logs --tail=50

echo "✅ Deployment completed!"
echo "🌐 Your app should be available at: http://localhost"
