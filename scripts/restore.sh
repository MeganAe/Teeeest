#!/bin/bash

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: ./restore.sh <backup_file.sql.gz>"
  exit 1
fi

echo "🔄 Restoring backup: $BACKUP_FILE"

if docker ps | grep -q amka_postgres; then
  gunzip -c $BACKUP_FILE | docker exec -i amka_postgres psql -U amka_user amka_db
else
  gunzip -c $BACKUP_FILE | psql -U amka_user -h localhost amka_db
fi

echo "✅ Backup restored successfully!"