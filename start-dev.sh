#!/bin/bash
# Script de démarrage rapide pour développement local

echo "🏥 AMKA Medical System - Démarrage..."

# Check if Docker is available for PostgreSQL
if command -v docker &> /dev/null; then
  echo "📦 Démarrage PostgreSQL avec Docker..."
  docker run -d \
    --name amka_postgres \
    -e POSTGRES_USER=amka_user \
    -e POSTGRES_PASSWORD=amka_password \
    -e POSTGRES_DB=amka_db \
    -p 5432:5432 \
    postgres:15-alpine 2>/dev/null || echo "PostgreSQL déjà en cours..."
  sleep 3
fi

# Backend
echo "🔧 Démarrage du backend..."
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init 2>/dev/null || npx prisma migrate deploy
npx ts-node src/prisma/seed.ts 2>/dev/null || true
npm run start:dev &
BACKEND_PID=$!
cd ..

sleep 5

# Frontend
echo "🎨 Démarrage du frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ AMKA est en cours de démarrage!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend:  http://localhost:5000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter"

wait $BACKEND_PID $FRONTEND_PID
