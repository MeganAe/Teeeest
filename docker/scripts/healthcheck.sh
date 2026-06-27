#!/bin/bash

# Check backend health
BACKEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health)

if [ "$BACKEND_HEALTH" -eq 200 ]; then
  echo "✅ Backend is healthy"
else
  echo "❌ Backend is unhealthy"
  exit 1
fi

# Check frontend
FRONTEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)

if [ "$FRONTEND_HEALTH" -eq 200 ]; then
  echo "✅ Frontend is healthy"
else
  echo "❌ Frontend is unhealthy"
  exit 1
fi

echo "✅ All services are healthy"