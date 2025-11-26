# Utiliser Nginx Alpine pour un conteneur léger
FROM nginx:alpine

# Copier les fichiers du site vers le répertoire Nginx
COPY . /usr/share/nginx/html/

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 (interne au conteneur)
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
