#!/bin/bash

# Script de vérification de santé pour Move And Play Kids
# Usage: ./healthcheck.sh

set -e

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏥 Vérification de santé du site Move And Play Kids${NC}\n"

# 1. Vérifier si Docker est installé
echo -n "🐳 Docker installé... "
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo -e "${RED}Docker n'est pas installé${NC}"
    exit 1
fi

# 2. Vérifier si Docker Compose est installé
echo -n "🐳 Docker Compose installé... "
if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo -e "${RED}Docker Compose n'est pas installé${NC}"
    exit 1
fi

# 3. Vérifier si le conteneur est en cours d'exécution
echo -n "📦 Conteneur en cours d'exécution... "
if docker ps | grep -q "moveandplaykids-web"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo -e "${YELLOW}Le conteneur n'est pas en cours d'exécution${NC}"
    echo -e "${YELLOW}Lancez: ./manage.sh start${NC}"
    exit 1
fi

# 4. Vérifier si le site répond sur le port 4000
echo -n "🌐 Site accessible sur port 4000... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:4000 | grep -q "200"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo -e "${YELLOW}Le site ne répond pas correctement${NC}"
fi

# 5. Vérifier l'utilisation des ressources
echo -n "💾 Utilisation mémoire... "
MEM_USAGE=$(docker stats --no-stream --format "{{.MemPerc}}" moveandplaykids-web | sed 's/%//')
if (( $(echo "$MEM_USAGE < 80" | bc -l) )); then
    echo -e "${GREEN}${MEM_USAGE}%${NC}"
else
    echo -e "${YELLOW}${MEM_USAGE}% (élevé)${NC}"
fi

# 6. Vérifier l'utilisation CPU
echo -n "🔥 Utilisation CPU... "
CPU_USAGE=$(docker stats --no-stream --format "{{.CPUPerc}}" moveandplaykids-web | sed 's/%//')
if (( $(echo "$CPU_USAGE < 80" | bc -l) )); then
    echo -e "${GREEN}${CPU_USAGE}%${NC}"
else
    echo -e "${YELLOW}${CPU_USAGE}% (élevé)${NC}"
fi

# 7. Vérifier les logs pour des erreurs récentes
echo -n "📋 Erreurs récentes dans les logs... "
ERROR_COUNT=$(docker-compose logs --tail=100 2>&1 | grep -i "error" | wc -l)
if [ "$ERROR_COUNT" -eq 0 ]; then
    echo -e "${GREEN}Aucune${NC}"
else
    echo -e "${YELLOW}${ERROR_COUNT} erreur(s) trouvée(s)${NC}"
fi

# 8. Vérifier l'espace disque
echo -n "💿 Espace disque disponible... "
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "${GREEN}${DISK_USAGE}% utilisé${NC}"
else
    echo -e "${YELLOW}${DISK_USAGE}% utilisé (élevé)${NC}"
fi

# 9. Vérifier Nginx (si installé)
echo -n "🔧 Nginx (reverse proxy)... "
if command -v nginx &> /dev/null; then
    if sudo nginx -t &> /dev/null; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${YELLOW}Configuration invalide${NC}"
    fi
else
    echo -e "${YELLOW}Non installé${NC}"
fi

# Résumé
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Vérification terminée${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Afficher les informations du conteneur
echo -e "${BLUE}📊 Informations du conteneur:${NC}"
docker ps --filter name=moveandplaykids-web --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo -e "\n${BLUE}🔗 Accès:${NC}"
echo -e "  Local: ${GREEN}http://localhost:4000${NC}"
echo -e "  Logs:  ${YELLOW}./manage.sh logs${NC}"
