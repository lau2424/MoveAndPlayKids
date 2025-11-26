# 📝 Commandes utiles - Move And Play Kids

## 🚀 Déploiement initial

```bash
# Rendre les scripts exécutables
chmod +x *.sh

# Déployer
./deploy.sh

# Vérifier
./healthcheck.sh
```

---

## 🎮 Gestion quotidienne

### Scripts de gestion

```bash
./manage.sh start          # Démarrer le conteneur
./manage.sh stop           # Arrêter le conteneur
./manage.sh restart        # Redémarrer le conteneur
./manage.sh logs           # Voir les logs en temps réel
./manage.sh status         # Voir le statut
./manage.sh update         # Mettre à jour le site
./manage.sh clean          # Nettoyer Docker
./manage.sh shell          # Accéder au shell
./manage.sh stats          # Voir les statistiques
```

### Commandes Docker directes

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Redémarrer
docker-compose restart

# Logs
docker-compose logs -f

# Logs avec limite
docker-compose logs -f --tail=100

# Statut
docker-compose ps

# Reconstruire
docker-compose build --no-cache

# Reconstruire et redémarrer
docker-compose up -d --build
```

---

## 🔍 Monitoring et Debug

### Vérifications

```bash
# Healthcheck complet
./healthcheck.sh

# Tester en local
./test-local.sh

# Voir les conteneurs actifs
docker ps

# Voir tous les conteneurs
docker ps -a

# Statistiques en temps réel
docker stats moveandplaykids-web

# Statistiques sans stream
docker stats --no-stream moveandplaykids-web
```

### Logs

```bash
# Logs du conteneur
docker-compose logs

# Logs en temps réel
docker-compose logs -f

# Dernières 50 lignes
docker-compose logs --tail=50

# Logs Nginx du VPS
sudo tail -f /var/log/nginx/moveandplaykids-access.log
sudo tail -f /var/log/nginx/moveandplaykids-error.log
```

### Accéder au conteneur

```bash
# Shell interactif
docker exec -it moveandplaykids-web sh

# Exécuter une commande
docker exec moveandplaykids-web ls -la /usr/share/nginx/html

# Voir les processus
docker exec moveandplaykids-web ps aux
```

---

## 🔧 Nginx (VPS)

### Configuration

```bash
# Copier la config
sudo cp nginx-reverse-proxy.conf /etc/nginx/sites-available/moveandplaykids

# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/moveandplaykids /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx

# Redémarrer Nginx
sudo systemctl restart nginx

# Voir le statut
sudo systemctl status nginx
```

### Logs Nginx

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/moveandplaykids-access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/moveandplaykids-error.log

# Dernières 100 lignes
sudo tail -n 100 /var/log/nginx/access.log
```

---

## 🔒 SSL / HTTPS

### Installation Certbot

```bash
# Installer Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

### Obtenir un certificat

```bash
# Pour un domaine
sudo certbot --nginx -d moveandplaykids.com

# Pour plusieurs domaines
sudo certbot --nginx -d moveandplaykids.com -d www.moveandplaykids.com
```

### Gestion des certificats

```bash
# Lister les certificats
sudo certbot certificates

# Renouveler manuellement
sudo certbot renew

# Test de renouvellement
sudo certbot renew --dry-run

# Révoquer un certificat
sudo certbot revoke --cert-path /etc/letsencrypt/live/moveandplaykids.com/cert.pem
```

---

## 💾 Backup et Restauration

### Créer un backup

```bash
# Backup automatique
./backup.sh

# Backup manuel
tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz \
    --exclude='node_modules' \
    --exclude='backups' \
    --exclude='logs' \
    --exclude='.git' \
    .
```

### Restaurer un backup

```bash
# Extraire
tar -xzf backups/moveandplaykids_backup_YYYYMMDD_HHMMSS.tar.gz

# Redéployer
./deploy.sh
```

### Lister les backups

```bash
ls -lh backups/
```

---

## 🧹 Nettoyage Docker

### Nettoyage léger

```bash
# Supprimer les images inutilisées
docker image prune -f

# Supprimer les conteneurs arrêtés
docker container prune -f

# Supprimer les volumes inutilisés
docker volume prune -f
```

### Nettoyage complet

```bash
# Tout nettoyer (ATTENTION: supprime tout ce qui n'est pas utilisé)
docker system prune -a -f

# Avec les volumes
docker system prune -a -f --volumes
```

### Nettoyage spécifique

```bash
# Arrêter et supprimer le conteneur
docker-compose down -v

# Supprimer l'image
docker rmi moveandplaykids_moveandplaykids

# Reconstruire from scratch
docker-compose build --no-cache
docker-compose up -d
```

---

## 🔄 Mise à jour

### Avec Git

```bash
# Récupérer les changements
git pull

# Redéployer
./manage.sh update
```

### Sans Git

```bash
# 1. Uploader les nouveaux fichiers via SFTP/SCP
# 2. Redéployer
./manage.sh update
```

### Mise à jour de Docker

```bash
# Mettre à jour Docker
sudo apt update
sudo apt upgrade docker-ce docker-ce-cli containerd.io

# Mettre à jour Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

---

## 🔍 Diagnostic

### Vérifier les ports

```bash
# Ports utilisés
sudo lsof -i -P -n

# Port spécifique
sudo lsof -i :4000

# Netstat
sudo netstat -tulpn | grep :4000
```

### Vérifier l'espace disque

```bash
# Espace disque général
df -h

# Espace utilisé par Docker
docker system df

# Détails
docker system df -v
```

### Vérifier la mémoire

```bash
# Mémoire système
free -h

# Mémoire Docker
docker stats --no-stream
```

### Tester la connectivité

```bash
# Test local
curl http://localhost:4000

# Test avec headers
curl -I http://localhost:4000

# Test verbose
curl -v http://localhost:4000

# Test depuis l'extérieur
curl http://VOTRE_IP:4000
```

---

## 🛠️ Utilitaires

### Conversion d'images

```bash
# Convertir les images en WebP
npm run convert-images
```

### Vérifier les traductions

```bash
# Vérifier les traductions FR/EN
node check-translations.js
```

### Générer le sitemap

```bash
# Générer sitemap.xml
node generate-sitemap.js
```

---

## 📊 Informations système

### Docker

```bash
# Version Docker
docker --version
docker-compose --version

# Informations Docker
docker info

# Espace disque Docker
docker system df
```

### Système

```bash
# Version OS
lsb_release -a

# Uptime
uptime

# Charge système
top
htop

# Processus
ps aux | grep docker
ps aux | grep nginx
```

---

## 🚨 Urgences

### Le site est down

```bash
# 1. Vérifier le conteneur
docker ps
docker-compose logs

# 2. Redémarrer
./manage.sh restart

# 3. Si ça ne marche pas, redéployer
./deploy.sh

# 4. Vérifier Nginx
sudo systemctl status nginx
sudo nginx -t
```

### Erreur 502 Bad Gateway

```bash
# Vérifier que le conteneur tourne
docker ps

# Vérifier les logs
docker-compose logs
sudo tail -f /var/log/nginx/error.log

# Redémarrer le conteneur
./manage.sh restart
```

### Erreur 404 Not Found

```bash
# Vérifier les fichiers dans le conteneur
docker exec moveandplaykids-web ls -la /usr/share/nginx/html

# Vérifier la config Nginx
docker exec moveandplaykids-web cat /etc/nginx/conf.d/default.conf
```

---

## 📞 Aide rapide

```bash
# Aide des scripts
./manage.sh              # Affiche l'aide
./deploy.sh --help       # Aide déploiement

# Aide Docker
docker --help
docker-compose --help

# Aide Nginx
nginx -h
```

---

**💡 Astuce**: Ajoutez cette page à vos favoris pour un accès rapide aux commandes!
