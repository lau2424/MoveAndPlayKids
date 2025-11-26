# Guide SEO - Move And Play Kids

## 📋 Fichiers SEO créés

### 1. **sitemap.xml**
Sitemap XML pour Google Search Console avec toutes les pages du site.
- **Emplacement**: `/sitemap.xml`
- **URL**: https://www.moveandplaykids.com/sitemap.xml

### 2. **robots.txt**
Fichier de directives pour les robots d'indexation.
- **Emplacement**: `/robots.txt`
- **URL**: https://www.moveandplaykids.com/robots.txt

## 🚀 Configuration Google Search Console

### Étape 1: Vérifier la propriété du site
1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Cliquer sur "Ajouter une propriété"
3. Entrer l'URL: `https://www.moveandplaykids.com`
4. Choisir une méthode de vérification:
   - **Recommandé**: Balise HTML (déjà ajoutée dans le `<head>`)
   - Alternative: Fichier HTML à télécharger
   - Alternative: Google Analytics (si déjà installé)

### Étape 2: Soumettre le sitemap
1. Dans Google Search Console, aller dans "Sitemaps"
2. Entrer l'URL du sitemap: `sitemap.xml`
3. Cliquer sur "Envoyer"

### Étape 3: Demander l'indexation
1. Aller dans "Inspection d'URL"
2. Entrer chaque URL importante:
   - `https://www.moveandplaykids.com/`
   - `https://www.moveandplaykids.com/ateliers.html`
   - `https://www.moveandplaykids.com/stages.html`
   - `https://www.moveandplaykids.com/projet.html`
3. Cliquer sur "Demander l'indexation"

## 🎯 Optimisations SEO implémentées

### Meta Tags
✅ Titres optimisés avec mots-clés locaux (Bruxelles, Woluwe Saint Lambert)
✅ Descriptions uniques pour chaque page (155-160 caractères)
✅ Keywords pertinents
✅ Canonical URLs
✅ Robots meta tags

### Open Graph (Facebook)
✅ og:type, og:url, og:title, og:description
✅ og:image avec images pertinentes
✅ og:locale (fr_BE)
✅ og:site_name

### Twitter Cards
✅ twitter:card (summary_large_image)
✅ twitter:title, twitter:description
✅ twitter:image

### Données structurées (Schema.org)
✅ **Page d'accueil**: LocalBusiness + Organization
✅ **Ateliers**: ItemList avec Course
✅ **Stages**: EventSeries
✅ **Projet**: AboutPage avec Person

### Langues alternatives
✅ Balises hreflang (fr, en, x-default)
✅ Support multilingue dans le sitemap

## 📊 Mots-clés ciblés

### Principaux
- ateliers enfants Bruxelles
- stages vacances Bruxelles
- psychomotricité enfants
- activités enfants Woluwe Saint Lambert
- éveil créatif enfants

### Secondaires
- homobaby
- atelier gustatif enfants
- Tiny Adventure
- puéricultrice Bruxelles
- garde d'enfants Bruxelles

## 🔧 Maintenance

### Mettre à jour le sitemap
```bash
node generate-sitemap.js
```

### Vérifier les erreurs SEO
1. Google Search Console → Couverture
2. Vérifier les erreurs 404
3. Vérifier les problèmes d'indexation

### Tester les données structurées
- [Test des résultats enrichis Google](https://search.google.com/test/rich-results)
- [Validateur Schema.org](https://validator.schema.org/)

## 📈 Suivi des performances

### Métriques à surveiller
- **Impressions**: Nombre de fois où le site apparaît dans les résultats
- **Clics**: Nombre de clics depuis Google
- **CTR**: Taux de clic (Clics / Impressions)
- **Position moyenne**: Position dans les résultats de recherche

### Outils recommandés
- Google Search Console (gratuit)
- Google Analytics 4 (gratuit)
- Bing Webmaster Tools (gratuit)

## 🌐 URLs importantes

- **Site**: https://www.moveandplaykids.com
- **Sitemap**: https://www.moveandplaykids.com/sitemap.xml
- **Robots.txt**: https://www.moveandplaykids.com/robots.txt

## ✅ Checklist post-déploiement

- [ ] Vérifier que le site est accessible en HTTPS
- [ ] Vérifier que sitemap.xml est accessible
- [ ] Vérifier que robots.txt est accessible
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Soumettre le sitemap à Bing Webmaster Tools
- [ ] Tester les données structurées
- [ ] Vérifier les balises Open Graph avec [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Vérifier les Twitter Cards avec [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Configurer Google Analytics (optionnel)
- [ ] Configurer un suivi des conversions (réservations)

## 🎨 Images optimisées

Toutes les images sont au format WebP pour des performances optimales:
- Compression sans perte de qualité
- Taille réduite de 25-35% vs JPEG
- Support natif dans tous les navigateurs modernes

## 📱 Mobile-First

Le site est optimisé pour mobile:
- Meta viewport configuré
- Design responsive avec Tailwind CSS
- Images adaptatives
- Performance optimisée

## 🔒 Sécurité

- HTTPS obligatoire (à configurer sur le serveur)
- Pas de données sensibles dans le code
- Formulaires sécurisés (Formspree)

---

**Dernière mise à jour**: 26 novembre 2024
**Domaine**: moveandplaykids.com
**Contact**: contact@moveandplaykids.fr
