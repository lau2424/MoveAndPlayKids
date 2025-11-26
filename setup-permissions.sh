#!/bin/bash

# Script pour rendre tous les scripts exécutables
# Usage: bash setup-permissions.sh

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Configuration des permissions...${NC}\n"

# Liste des scripts à rendre exécutables
SCRIPTS=(
    "deploy.sh"
    "manage.sh"
    "backup.sh"
    "healthcheck.sh"
    "test-local.sh"
    "setup-permissions.sh"
)

# Rendre chaque script exécutable
for script in "${SCRIPTS[@]}"; do
    if [ -f "$script" ]; then
        chmod +x "$script"
        echo -e "${GREEN}✓ $script${NC}"
    else
        echo -e "⚠ $script non trouvé"
    fi
done

echo -e "\n${GREEN}✅ Permissions configurées!${NC}"
echo -e "${BLUE}Vous pouvez maintenant exécuter: ./deploy.sh${NC}\n"
