#!/bin/bash

echo "📊 AMKA Medical Center - System Monitor"
echo "========================================"

# CPU Usage
echo "CPU Usage:"
top -bn1 | grep "Cpu(s)" | awk '{print "  " $2 "% user, " $4 "% system"}'

# Memory Usage
echo ""
echo "Memory Usage:"
free -h | awk 'NR==2{printf "  Total: %s, Used: %s, Free: %s\n", $2, $3, $4}'

# Disk Usage
echo ""
echo "Disk Usage:"
df -h / | awk 'NR==2{printf "  Used: %s / %s (%s)\n", $3, $2, $5}'

# Docker containers status
echo ""
echo "Docker Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Database size
echo ""
echo "Database Size:"
if docker ps | grep -q amka_postgres; then
  docker exec amka_postgres psql -U amka_user -d amka_db -c "SELECT pg_database_size('amka_db')/1024/1024 || ' MB' as size;"
fi

echo ""
echo "========================================"