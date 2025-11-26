#!/bin/bash

# Script de test local pour Move And Play Kids
# Usage: ./test-local.sh

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🧪 Test local de Move And Play Kids${NC}\n"

# 1. Vérifier les prérequis
echo -e "${YELLOW}1. Vérification des prérequis...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker installé${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose installé${NC}"

# 2. Vérifier les fichiers nécessaires
echo -e "\n${YELLOW}2. Vérification des fichiers...${NC}"

FILES=("Dockerfile" "docker-compose.yml" "nginx.conf" "index.html" "styles.css" "app.js" "translations.js")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}❌ $file manquant${NC}"
        exit 1
    fi
done

# 3. Construire l'image
echo -e "\n${YELLOW}3. Construction de l'image Docker...${NC}"
docker-compose build

# 4. Démarrer le conteneur
echo -e "\n${YELLOW}4. Démarrage du conteneur...${NC}"
docker-compose up -d

# 5. Attendre que le conteneur soit prêt
echo -e "\n${YELLOW}5. Attente du démarrage...${NC}"
sleep 5

# 6. Tester l'accès au site
echo -e "\n${YELLOW}6. Test d'accès au site...${NC}"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Site accessible (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ Site inaccessible (HTTP $HTTP_CODE)${NC}"
    docker-compose logs
    exit 1
fi

# 7. Tester les pages principales
echo -e "\n${YELLOW}7. Test des pages principales...${NC}"

PAGES=("index.html" "ateliers.html" "stages.html" "projet.html")
for page in "${PAGES[@]}"; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4000/$page")
    if [ "$HTTP_CODE" -eq 200 ]; then
        echo -e "${GREEN}✓ $page (HTTP $HTTP_CODE)${NC}"
    else
        echo -e "${RED}❌ $page (HTTP $HTTP_CODE)${NC}"
    fi
done

# 8. Tester les assets
echo -e "\n${YELLOW}8. Test des assets...${NC}"

ASSETS=("styles.css" "app.js" "translations.js")
for asset in "${ASSETS[@]}"; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4000/$asset")
    if [ "$HTTP_CODE" -eq 200 ]; then
        echo -e "${GREEN}✓ $asset (HTTP $HTTP_CODE)${NC}"
    else
        echo -e "${RED}❌ $asset (HTTP $HTTP_CODE)${NC}"
    fi
done

# 9. Vérifier les logs
echo -e "\n${YELLOW}9. Vérification des logs...${NC}"
ERROR_COUNT=$(docker-compose logs 2>&1 | grep -i "error" | wc -l)
if [ "$ERROR_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓ Aucune erreur dans les logs${NC}"
else
    echo -e "${YELLOW}⚠ $ERROR_COUNT erreur(s) trouvée(s) dans les logs${NC}"
fi

# 10. Afficher les statistiques
echo -e "\n${YELLOW}10. Statistiques du conteneur...${NC}"
docker stats --no-stream moveandplaykids-web --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# Résumé
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Tests terminés avec succès!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${GREEN}🌐 Le site est accessible sur: http://localhost:4000${NC}"
echo -e "${YELLOW}📊 Voir les logs: ./manage.sh logs${NC}"
echo -e "${YELLOW}⏹️  Arrêter: ./manage.sh stop${NC}\n"

# Proposer d'ouvrir le navigateur
read -p "Voulez-vous ouvrir le site dans le navigateur? (o/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:4000
    elif command -v open &> /dev/null; then
        open http://localhost:4000
    else
        echo -e "${YELLOW}Impossible d'ouvrir le navigateur automatiquement${NC}"
        echo -e "${YELLOW}Ouvrez manuellement: http://localhost:4000${NC}"
    fi
fi
