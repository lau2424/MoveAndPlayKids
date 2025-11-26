#!/bin/bash

# Script de backup pour Move And Play Kids
# Usage: ./backup.sh

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Variables
BACKUP_DIR="backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="moveandplaykids_backup_${DATE}.tar.gz"

echo -e "${YELLOW}📦 Création du backup...${NC}"

# Créer le dossier de backup s'il n'existe pas
mkdir -p $BACKUP_DIR

# Créer l'archive
tar -czf "${BACKUP_DIR}/${BACKUP_NAME}" \
    --exclude='node_modules' \
    --exclude='backups' \
    --exclude='logs' \
    --exclude='.git' \
    --exclude='*.log' \
    .

echo -e "${GREEN}✅ Backup créé: ${BACKUP_DIR}/${BACKUP_NAME}${NC}"

# Garder seulement les 5 derniers backups
cd $BACKUP_DIR
ls -t moveandplaykids_backup_*.tar.gz | tail -n +6 | xargs -r rm

echo -e "${GREEN}🗑️  Anciens backups nettoyés${NC}"
echo -e "${GREEN}📊 Backups disponibles:${NC}"
ls -lh moveandplaykids_backup_*.tar.gz 2>/dev/null || echo "Aucun backup"
