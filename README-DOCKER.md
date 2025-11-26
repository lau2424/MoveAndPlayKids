# 🐳 Déploiement Docker - Move And Play Kids

## 📋 Prérequis

- Docker installé (version 20.10+)
- Docker Compose installé (version 1.29+)

## 🚀 Déploiement rapide

### Option 1: Script automatique (recommandé)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Commandes manuelles

```bash
# Construire l'image
docker-compose build

# Démarrer le conteneur
docker-compose up -d

# Vérifier le statut
docker-compose ps
```

## 🌐 Accès au site

Le site sera accessible sur:
- **Local**: http://localhost:4000
- **Production**: Configurer Nginx reverse proxy (voir ci-dessous)

## 📊 Commandes utiles

### Voir les logs
```bash
docker-compose logs -f
```

### Arrêter le conteneur
```bash
docker-compose down
```

### Redémarrer le conteneur
```bash
docker-compose restart
```

### Reconstruire et redémarrer
```bash
docker-compose up -d --build
```

### Voir les conteneurs actifs
```bash
docker ps
```

### Entrer dans le conteneur
```bash
docker exec -it moveandplaykids-web sh
```

## 🔧 Configuration Nginx Reverse Proxy (Production)

Pour exposer le site sur le port 80/443 avec votre domaine:

### 1. Créer la configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/moveandplaykids
```

### 2. Ajouter cette configuration

```nginx
server {
    listen 80;
    server_name moveandplaykids.com www.moveandplaykids.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Activer le site

```bash
sudo ln -s /etc/nginx/sites-available/moveandplaykids /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Configurer SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d moveandplaykids.com -d www.moveandplaykids.com
```

## 🔒 Sécurité

- Les fichiers sensibles sont exclus via `.dockerignore`
- Headers de sécurité configurés dans `nginx.conf`
- Logs accessibles dans le dossier `./logs`

## 📦 Structure des fichiers Docker

```
.
├── Dockerfile              # Configuration de l'image Docker
├── docker-compose.yml      # Orchestration des conteneurs
├── nginx.conf             # Configuration Nginx personnalisée
├── .dockerignore          # Fichiers exclus de l'image
├── deploy.sh              # Script de déploiement automatique
└── README-DOCKER.md       # Cette documentation
```

## 🐛 Dépannage

### Le conteneur ne démarre pas
```bash
docker-compose logs
```

### Port 4000 déjà utilisé
Modifier le port dans `docker-compose.yml`:
```yaml
ports:
  - "NOUVEAU_PORT:80"
```

### Problèmes de permissions
```bash
sudo chown -R $USER:$USER .
```

### Nettoyer complètement Docker
```bash
docker-compose down -v
docker system prune -a
```

## 🔄 Mise à jour du site

1. Modifier les fichiers du site
2. Reconstruire et redémarrer:
```bash
./deploy.sh
```

## 📈 Monitoring

### Voir l'utilisation des ressources
```bash
docker stats moveandplaykids-web
```

### Voir les logs en temps réel
```bash
docker-compose logs -f --tail=100
```

## 🎯 Ports utilisés

- **4000**: Port externe (hôte) → Port 80 interne (conteneur)
- Configurable dans `docker-compose.yml`

## 💡 Notes importantes

- Le conteneur redémarre automatiquement (`restart: unless-stopped`)
- Les logs sont persistés dans `./logs`
- L'image utilise Nginx Alpine (très léger, ~23MB)
- Compression gzip activée pour les performances
- Cache des assets statiques configuré (1 an)

## 📞 Support

Pour toute question, contactez l'équipe technique.
