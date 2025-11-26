#!/bin/bash

# Script de gestion pour Move And Play Kids
# Usage: ./manage.sh [start|stop|restart|logs|status|update|clean]

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Fonction d'aide
show_help() {
    echo -e "${BLUE}🎯 Move And Play Kids - Gestion Docker${NC}"
    echo ""
    echo "Usage: ./manage.sh [commande]"
    echo ""
    echo "Commandes disponibles:"
    echo "  start     - Démarrer le conteneur"
    echo "  stop      - Arrêter le conteneur"
    echo "  restart   - Redémarrer le conteneur"
    echo "  logs      - Voir les logs en temps réel"
    echo "  status    - Voir le statut du conteneur"
    echo "  update    - Mettre à jour et redéployer"
    echo "  clean     - Nettoyer les images inutilisées"
    echo "  shell     - Accéder au shell du conteneur"
    echo "  stats     - Voir les statistiques du conteneur"
    echo ""
}

# Fonction start
start_container() {
    echo -e "${YELLOW}▶️  Démarrage du conteneur...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✅ Conteneur démarré!${NC}"
    echo -e "${GREEN}🌐 Site accessible sur: http://localhost:4000${NC}"
}

# Fonction stop
stop_container() {
    echo -e "${YELLOW}⏹️  Arrêt du conteneur...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Conteneur arrêté!${NC}"
}

# Fonction restart
restart_container() {
    echo -e "${YELLOW}🔄 Redémarrage du conteneur...${NC}"
    docker-compose restart
    echo -e "${GREEN}✅ Conteneur redémarré!${NC}"
}

# Fonction logs
show_logs() {
    echo -e "${BLUE}📊 Logs du conteneur (Ctrl+C pour quitter):${NC}"
    docker-compose logs -f --tail=100
}

# Fonction status
show_status() {
    echo -e "${BLUE}📊 Statut du conteneur:${NC}"
    docker-compose ps
    echo ""
    echo -e "${BLUE}🔍 Détails:${NC}"
    docker ps --filter name=moveandplaykids-web --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

# Fonction update
update_site() {
    echo -e "${YELLOW}🔄 Mise à jour du site...${NC}"
    
    # Récupérer les dernières modifications
    echo -e "${YELLOW}📥 Récupération des dernières modifications...${NC}"
    git pull
    
    # Arrêter le conteneur
    docker-compose down
    
    # Reconstruire l'image
    echo -e "${YELLOW}🔨 Reconstruction de l'image...${NC}"
    docker-compose build --no-cache
    
    # Redémarrer
    docker-compose up -d
    
    echo -e "${GREEN}✅ Mise à jour terminée!${NC}"
}

# Fonction clean
clean_docker() {
    echo -e "${YELLOW}🗑️  Nettoyage des images inutilisées...${NC}"
    docker image prune -f
    echo -e "${GREEN}✅ Nettoyage terminé!${NC}"
}

# Fonction shell
enter_shell() {
    echo -e "${BLUE}🐚 Accès au shell du conteneur...${NC}"
    docker exec -it moveandplaykids-web sh
}

# Fonction stats
show_stats() {
    echo -e "${BLUE}📈 Statistiques du conteneur (Ctrl+C pour quitter):${NC}"
    docker stats moveandplaykids-web
}

# Main
case "$1" in
    start)
        start_container
        ;;
    stop)
        stop_container
        ;;
    restart)
        restart_container
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    update)
        update_site
        ;;
    clean)
        clean_docker
        ;;
    shell)
        enter_shell
        ;;
    stats)
        show_stats
        ;;
    *)
        show_help
        exit 1
        ;;
esac
