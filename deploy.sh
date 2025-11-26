#!/bin/bash

# Script de déploiement pour Move And Play Kids
# Usage: ./deploy.sh

set -e

echo "🚀 Déploiement de Move And Play Kids..."

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color


# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker n'est pas installé${NC}"
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose n'est pas installé${NC}"
    exit 1
fi


# Arrêter les conteneurs existants
echo -e "${YELLOW}⏹️  Arrêt des conteneurs existants...${NC}"
docker-compose down 2>/dev/null || true

# Supprimer les anciennes images
echo -e "${YELLOW}🗑️  Nettoyage des anciennes images...${NC}"
docker image prune -f

# Construire l'image
echo -e "${YELLOW}🔨 Construction de l'image Docker...${NC}"
docker-compose build --no-cache

# Démarrer les conteneurs
echo -e "${YELLOW}▶️  Démarrage des conteneurs...${NC}"
docker-compose up -d

# Attendre que le conteneur soit prêt
echo -e "${YELLOW}⏳ Attente du démarrage du conteneur...${NC}"
sleep 3

# Vérifier le statut
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Déploiement réussi!${NC}"
    echo -e "${GREEN}🌐 Le site est accessible sur: http://localhost:4000${NC}"
    echo -e "${GREEN}📊 Logs: docker-compose logs -f${NC}"
    echo -e "${GREEN}⏹️  Arrêter: docker-compose down${NC}"
else
    echo -e "${RED}❌ Erreur lors du déploiement${NC}"
    docker-compose logs
    exit 1
fi

# Afficher les informations du conteneur
echo -e "\n${YELLOW}📦 Informations du conteneur:${NC}"
docker-compose ps
