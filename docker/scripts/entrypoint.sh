#!/bin/sh

set -e

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Seed database if needed
if [ "$NODE_ENV" = "development" ]; then
  echo "Seeding database..."
  npx prisma db seed
fi

# Start the application
echo "Starting application..."
exec node dist/main