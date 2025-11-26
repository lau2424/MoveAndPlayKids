/**
 * Script de génération automatique du sitemap.xml
 * Usage: node generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://www.moveandplaykids.com';
const OUTPUT_FILE = 'sitemap.xml';

// Pages du site avec leurs priorités et fréquences de mise à jour
const pages = [
    {
        url: '/',
        priority: 1.0,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0]
    },
    {
        url: '/ateliers.html',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0]
    },
    {
        url: '/stages.html',
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0]
    },
    {
        url: '/projet.html',
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
    }
];

// Langues supportées
const languages = ['fr', 'en'];

/**
 * Génère le contenu XML du sitemap
 */
function generateSitemap() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
    
    pages.forEach(page => {
        xml += '    \n';
        xml += `    <!-- Page ${page.url} -->\n`;
        xml += '    <url>\n';
        xml += `        <loc>${DOMAIN}${page.url}</loc>\n`;
        xml += `        <lastmod>${page.lastmod}</lastmod>\n`;
        xml += `        <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `        <priority>${page.priority}</priority>\n`;
        
        // Ajouter les liens alternatifs pour chaque langue
        languages.forEach(lang => {
            xml += `        <xhtml:link rel="alternate" hreflang="${lang}" href="${DOMAIN}${page.url}"/>\n`;
        });
        
        xml += '    </url>\n';
    });
    
    xml += '    \n';
    xml += '</urlset>\n';
    
    return xml;
}

/**
 * Écrit le sitemap dans un fichier
 */
function writeSitemap() {
    try {
        const sitemapContent = generateSitemap();
        fs.writeFileSync(OUTPUT_FILE, sitemapContent, 'utf8');
        console.log('✅ Sitemap généré avec succès:', OUTPUT_FILE);
        console.log(`📄 ${pages.length} pages incluses`);
        console.log(`🌐 Domaine: ${DOMAIN}`);
    } catch (error) {
        console.error('❌ Erreur lors de la génération du sitemap:', error);
        process.exit(1);
    }
}

// Exécution
writeSitemap();
