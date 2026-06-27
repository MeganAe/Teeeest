#!/bin/bash

set -e

echo "🚀 Building AMKA Medical Center images..."

cd ../..

# Build backend
echo "📦 Building backend..."
docker build -f docker/Dockerfile.backend -t amka-backend:latest .

# Build frontend
echo "📦 Building frontend..."
docker build -f docker/Dockerfile.frontend -t amka-frontend:latest .

echo "✅ Build completed!"