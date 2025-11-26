# 📦 Guide d'installation en production - Move And Play Kids

## 🎯 Vue d'ensemble

Ce guide vous accompagne pour déployer le site Move And Play Kids sur votre VPS avec Docker.

**Port utilisé**: 4000 (disponible sur votre VPS)

---

## 📋 Étape 1: Prérequis sur le VPS

### Vérifier Docker

```bash
docker --version
docker-compose --version
```

### Si Docker n'est pas installé

```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Redémarrer la session
exit
# Se reconnecter en SSH
```

---

## 🚀 Étape 2: Déployer le site

### Option A: Déploiement automatique (recommandé)

```bash
cd /home/ubuntu/moveandplaykids
chmod +x deploy.sh
./deploy.sh
```

### Option B: Déploiement manuel

```bash
cd /home/ubuntu/moveandplaykids

# Construire l'image
docker-compose build

# Démarrer le conteneur
docker-compose up -d

# Vérifier le statut
docker-compose ps
docker-compose logs
```

---

## 🌐 Étape 3: Configurer Nginx Reverse Proxy

### 1. Copier la configuration

```bash
sudo cp nginx-reverse-proxy.conf /etc/nginx/sites-available/moveandplaykids
```

### 2. Activer le site

```bash
sudo ln -s /etc/nginx/sites-available/moveandplaykids /etc/nginx/sites-enabled/
```

### 3. Tester la configuration

```bash
sudo nginx -t
```

### 4. Recharger Nginx

```bash
sudo systemctl reload nginx
```

### 5. Vérifier que ça fonctionne

Ouvrir dans un navigateur: `http://votre-ip-vps`

---

## 🔒 Étape 4: Configurer SSL (HTTPS)

### 1. Installer Certbot

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtenir le certificat SSL

```bash
sudo certbot --nginx -d moveandplaykids.com -d www.moveandplaykids.com
```

Suivre les instructions interactives:
- Entrer votre email
- Accepter les conditions
- Choisir de rediriger HTTP vers HTTPS (option 2)

### 3. Vérifier le renouvellement automatique

```bash
sudo certbot renew --dry-run
```

---

## ✅ Étape 5: Vérifications finales

### Vérifier que le conteneur tourne

```bash
docker ps
```

Vous devriez voir `moveandplaykids-web` avec le statut `Up`.

### Vérifier les logs

```bash
docker-compose logs -f
```

### Tester le site

- HTTP: `http://moveandplaykids.com`
- HTTPS: `https://moveandplaykids.com`

---

## 🔧 Commandes utiles

### Voir les logs en temps réel

```bash
docker-compose logs -f
```

### Redémarrer le conteneur

```bash
docker-compose restart
```

### Arrêter le conteneur

```bash
docker-compose down
```

### Mettre à jour le site

```bash
# 1. Modifier les fichiers
# 2. Redéployer
./deploy.sh
```

### Voir l'utilisation des ressources

```bash
docker stats moveandplaykids-web
```

---

## 🐛 Dépannage

### Le site ne s'affiche pas

```bash
# Vérifier les logs du conteneur
docker-compose logs

# Vérifier les logs Nginx
sudo tail -f /var/log/nginx/moveandplaykids-error.log

# Vérifier que le port 4000 est accessible
curl http://localhost:4000
```

### Erreur de port déjà utilisé

```bash
# Vérifier quel processus utilise le port 4000
sudo lsof -i :4000

# Si nécessaire, changer le port dans docker-compose.yml
```

### Problèmes de permissions

```bash
sudo chown -R $USER:$USER /home/ubuntu/moveandplaykids
```

### Nettoyer complètement Docker

```bash
docker-compose down -v
docker system prune -a
```

---

## 📊 Monitoring

### Voir les statistiques du conteneur

```bash
docker stats moveandplaykids-web
```

### Voir les logs Nginx du reverse proxy

```bash
sudo tail -f /var/log/nginx/moveandplaykids-access.log
sudo tail -f /var/log/nginx/moveandplaykids-error.log
```

### Voir les logs du conteneur

```bash
docker-compose logs -f --tail=100
```

---

## 🔄 Mise à jour du site

### Méthode 1: Avec Git (recommandé)

```bash
cd /home/ubuntu/moveandplaykids
git pull
./deploy.sh
```

### Méthode 2: Upload manuel

```bash
# 1. Uploader les nouveaux fichiers via SFTP
# 2. Sur le serveur:
cd /home/ubuntu/moveandplaykids
./deploy.sh
```

---

## 🎯 Architecture finale

```
Internet
    ↓
Nginx (port 80/443)
    ↓
Reverse Proxy
    ↓
Docker Container (port 4000 → 80)
    ↓
Nginx Alpine + Site statique
```

---

## 📞 Support

En cas de problème:
1. Vérifier les logs: `docker-compose logs`
2. Vérifier Nginx: `sudo nginx -t`
3. Vérifier le conteneur: `docker ps`

---

## ✨ Checklist de déploiement

- [ ] Docker et Docker Compose installés
- [ ] Fichiers du site uploadés sur le VPS
- [ ] Script `deploy.sh` exécuté avec succès
- [ ] Conteneur Docker en cours d'exécution
- [ ] Nginx reverse proxy configuré
- [ ] Site accessible via HTTP
- [ ] SSL configuré avec Certbot
- [ ] Site accessible via HTTPS
- [ ] Renouvellement automatique SSL testé
- [ ] Logs vérifiés

---

**🎉 Félicitations! Votre site est maintenant en production!**
