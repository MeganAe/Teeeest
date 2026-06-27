#!/bin/bash

set -e

echo "🚀 Deploying AMKA Medical Center..."

# Load environment variables
if [ -f .env.production ]; then
  export $(cat .env.production | grep -v '^#' | xargs)
fi

# Pull latest images if needed
# docker-compose -f docker/docker-compose.prod.yml pull

# Stop and remove old containers
docker-compose -f docker/docker-compose.prod.yml down

# Start new containers
docker-compose -f docker/docker-compose.prod.yml up -d

# Run database migrations
docker exec amka_backend_prod npx prisma migrate deploy

echo "✅ Deployment completed!"