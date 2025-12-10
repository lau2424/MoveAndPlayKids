# 🎯 Move And Play Kids

Site web pour les ateliers et stages pour enfants à Bruxelles.

## 🚀 Déploiement Docker (Production)

### Démarrage rapide (3 commandes)

```bash
chmod +x *.sh          # Rendre les scripts exécutables
./deploy.sh            # Déployer
./healthcheck.sh       # Vérifier
```

**Le site sera accessible sur:** `http://localhost:4000`

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| **[QUICK-START.md](QUICK-START.md)** | Guide de démarrage rapide (5 min) |
| **[INSTALLATION.md](INSTALLATION.md)** | Guide d'installation complet |
| **[README-DOCKER.md](README-DOCKER.md)** | Documentation Docker détaillée |
| **[DOCKER-SUMMARY.md](DOCKER-SUMMARY.md)** | Résumé de la configuration Docker |
| **[SEO-GUIDE.md](SEO-GUIDE.md)** | Guide d'optimisation SEO |

---

## 🛠️ Scripts disponibles

### Gestion quotidienne

```bash
./manage.sh start      # Démarrer le conteneur
./manage.sh stop       # Arrêter le conteneur
./manage.sh restart    # Redémarrer le conteneur
./manage.sh logs       # Voir les logs en temps réel
./manage.sh status     # Voir le statut du conteneur
./manage.sh update     # Mettre à jour le site
./manage.sh shell      # Accéder au shell du conteneur
./manage.sh stats      # Voir les statistiques
```

### Maintenance

```bash
./deploy.sh            # Déploiement complet
./backup.sh            # Créer un backup
./healthcheck.sh       # Vérifier la santé du site
./test-local.sh        # Tester en local avant prod
```

---

## 🏗️ Architecture

```
Internet → Nginx (80/443) → Docker (4000→80) → Nginx Alpine + Site
```

---

## 🎯 Ports

- **4000**: Application (externe)
- **80/443**: Nginx reverse proxy (production)

---

## 📦 Technologies

- **Frontend**: HTML5, CSS3 (Tailwind), JavaScript
- **Serveur**: Nginx Alpine
- **Conteneurisation**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt (Certbot)

---

## 🔧 Configuration production

### 1. Déployer le conteneur

```bash
./deploy.sh
```

### 2. Configurer Nginx reverse proxy

```bash
sudo cp nginx-reverse-proxy.conf /etc/nginx/sites-available/moveandplaykids
sudo ln -s /etc/nginx/sites-available/moveandplaykids /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Activer SSL

```bash
sudo certbot --nginx -d moveandplaykids.com -d www.moveandplaykids.com
```

---

## 📊 Monitoring

```bash
./healthcheck.sh       # Vérification complète
./manage.sh logs       # Logs en temps réel
./manage.sh stats      # Statistiques CPU/RAM
```

---

## 🔄 Mise à jour

```bash
# Méthode simple
./manage.sh update

# Ou manuellement
git pull
./deploy.sh
```

---

## 💾 Backup

```bash
./backup.sh            # Créer un backup
```

Les backups sont stockés dans `backups/` (5 derniers conservés).

---

## 🐛 Dépannage

### Le conteneur ne démarre pas
```bash
docker-compose logs
```

### Le site ne répond pas
```bash
./healthcheck.sh
curl http://localhost:4000
```

### Nettoyer Docker
```bash
docker-compose down -v
docker system prune -a
```

---

## 📁 Structure du projet

```
moveandplaykids/
├── 📄 HTML Pages
│   ├── index.html              # Page d'accueil
│   ├── ateliers.html           # Page ateliers
│   ├── stages.html             # Page stages
│   └── projet.html             # Page projet
│
├── 🎨 Assets
│   ├── styles.css              # Styles CSS
│   ├── app.js                  # JavaScript
│   ├── translations.js         # Traductions FR/EN
│   └── assets/                 # Images (WebP)
│
├── 🐳 Docker
│   ├── Dockerfile              # Image Docker
│   ├── docker-compose.yml      # Orchestration
│   ├── nginx.conf              # Config Nginx conteneur
│   └── nginx-reverse-proxy.conf # Config Nginx VPS
│
├── 🔧 Scripts
│   ├── deploy.sh               # Déploiement
│   ├── manage.sh               # Gestion
│   ├── backup.sh               # Backup
│   ├── healthcheck.sh          # Vérification santé
│   └── test-local.sh           # Tests locaux
│
├── 📚 Documentation
│   ├── README.md               # Ce fichier
│   ├── QUICK-START.md          # Démarrage rapide
│   ├── INSTALLATION.md         # Installation complète
│   ├── README-DOCKER.md        # Doc Docker
│   ├── DOCKER-SUMMARY.md       # Résumé Docker
│   └── SEO-GUIDE.md            # Guide SEO
│
└── 🛠️ Utilitaires
    ├── convert-to-webp.js      # Conversion images
    ├── check-translations.js   # Vérif traductions
    ├── generate-sitemap.js     # Génération sitemap
    ├── sitemap.xml             # Sitemap
    └── robots.txt              # Robots.txt
```

---

## ✅ Checklist de déploiement

- [ ] Docker installé
- [ ] Scripts exécutables (`chmod +x *.sh`)
- [ ] Déploiement effectué (`./deploy.sh`)
- [ ] Conteneur actif (`docker ps`)
- [ ] Site accessible (port 4000)
- [ ] Nginx reverse proxy configuré
- [ ] SSL/HTTPS activé
- [ ] Healthcheck OK
- [ ] Backup initial créé

---

## 🌐 Liens

- **Site**: https://moveandplaykids.com
- **Réservation**: https://booking.myrezapp.com/fr/online/booking/calendar/21324/move-and-play-kids
- **Email**: contact@moveandplaykids.fr
- **Téléphone**: 0472 75 07 66

---

## 📞 Support

Pour toute question:
1. Consulter la documentation dans les fichiers `.md`
2. Vérifier les logs: `./manage.sh logs`
3. Lancer le healthcheck: `./healthcheck.sh`

---

## 📄 Licence

© Move And Play Kids - Tous droits réservés

---

**Made with ❤️ by Lau**
