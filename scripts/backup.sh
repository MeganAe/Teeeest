#!/bin/bash

BACKUP_DIR="./database/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/amka_backup_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

echo "📁 Création du backup: $BACKUP_FILE"

if docker ps | grep -q amka_postgres; then
    docker exec amka_postgres pg_dump -U amka_user amka_db > $BACKUP_FILE
else
    pg_dump -U amka_user -h localhost amka_db > $BACKUP_FILE
fi

if [ $? -eq 0 ]; then
    echo "✅ Backup créé avec succès: $BACKUP_FILE"
    # Compresser
    gzip $BACKUP_FILE
    echo "✅ Backup compressé: $BACKUP_FILE.gz"
    
    # Supprimer les backups de plus de 30 jours
    find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
    echo "✅ Anciens backups nettoyés"
else
    echo "❌ Erreur lors de la création du backup"
    exit 1
fi