# 🚀 Quick Start - Move And Play Kids Docker

## ⚡ Démarrage rapide (3 commandes)

```bash
# 1. Rendre les scripts exécutables
chmod +x deploy.sh manage.sh backup.sh

# 2. Déployer
./deploy.sh

# 3. Vérifier
./manage.sh status
```

**C'est tout!** Le site est accessible sur `http://localhost:4000`

---

## 📝 Commandes essentielles

### Gestion quotidienne

```bash
./manage.sh start      # Démarrer
./manage.sh stop       # Arrêter
./manage.sh restart    # Redémarrer
./manage.sh logs       # Voir les logs
./manage.sh status     # Voir le statut
```

### Maintenance

```bash
./manage.sh update     # Mettre à jour le site
./manage.sh clean      # Nettoyer Docker
./backup.sh            # Créer un backup
```

### Debug

```bash
./manage.sh shell      # Accéder au conteneur
./manage.sh stats      # Voir les statistiques
docker-compose logs    # Logs complets
```

---

## 🌐 Configuration Nginx (Production)

### 1. Copier la config

```bash
sudo cp nginx-reverse-proxy.conf /etc/nginx/sites-available/moveandplaykids
sudo ln -s /etc/nginx/sites-available/moveandplaykids /etc/nginx/sites-enabled/
```

### 2. Activer

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 3. SSL (HTTPS)

```bash
sudo certbot --nginx -d moveandplaykids.com -d www.moveandplaykids.com
```

---

## 🔧 Ports utilisés

- **4000**: Application (externe)
- **80**: Nginx (interne au conteneur)

---

## 📦 Structure des fichiers

```
moveandplaykids/
├── Dockerfile                    # Image Docker
├── docker-compose.yml            # Orchestration
├── nginx.conf                    # Config Nginx conteneur
├── nginx-reverse-proxy.conf      # Config Nginx VPS
├── deploy.sh                     # Script de déploiement
├── manage.sh                     # Script de gestion
├── backup.sh                     # Script de backup
├── QUICK-START.md               # Ce fichier
├── INSTALLATION.md              # Guide complet
└── README-DOCKER.md             # Documentation Docker
```

---

## ✅ Checklist de déploiement

- [ ] Docker installé
- [ ] `./deploy.sh` exécuté
- [ ] Site accessible sur port 4000
- [ ] Nginx reverse proxy configuré
- [ ] SSL activé (production)

---

## 🆘 Problèmes courants

### Le conteneur ne démarre pas
```bash
docker-compose logs
```

### Port déjà utilisé
Modifier le port dans `docker-compose.yml`

### Site inaccessible
```bash
curl http://localhost:4000
sudo systemctl status nginx
```

---

## 📞 Aide

- Documentation complète: `INSTALLATION.md`
- Docker: `README-DOCKER.md`
- Logs: `./manage.sh logs`

---

**🎉 Bon déploiement!**
