#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// Fonction pour extraire toutes les clés de traduction du fichier translations.js
function extractTranslationKeys(translationsPath) {
  const content = fs.readFileSync(translationsPath, 'utf8');
  const keys = new Set();
  
  // Regex pour trouver les clés de traduction (format: 'key': 'value')
  const regex = /'([^']+)':/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    // Ignorer 'fr' qui est la langue
    if (key !== 'fr') {
      keys.add(key);
    }
  }
  
  return keys;
}

// Fonction pour extraire toutes les clés utilisées dans les fichiers HTML
function extractUsedKeys(htmlFiles) {
  const usedKeys = new Map(); // Map pour stocker clé -> [fichiers où elle est utilisée]
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Regex pour trouver data-i18n="key"
    const regex = /data-i18n="([^"]+)"/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      const key = match[1];
      if (!usedKeys.has(key)) {
        usedKeys.set(key, []);
      }
      usedKeys.get(key).push(path.basename(file));
    }
  });
  
  return usedKeys;
}

// Fonction principale
function main() {
  const projectDir = __dirname;
  const translationsPath = path.join(projectDir, 'translations.js');
  
  // Trouver tous les fichiers HTML
  const htmlFiles = [
    path.join(projectDir, 'index.html'),
    path.join(projectDir, 'ateliers.html'),
    path.join(projectDir, 'stages.html'),
    path.join(projectDir, 'projet.html')
  ].filter(file => fs.existsSync(file));
  
  console.log(`${colors.bold}${colors.cyan}=== Analyse des traductions ===${colors.reset}\n`);
  console.log(`Fichier de traductions: ${translationsPath}`);
  console.log(`Fichiers HTML analysés: ${htmlFiles.map(f => path.basename(f)).join(', ')}\n`);
  
  // Extraire les clés
  const allKeys = extractTranslationKeys(translationsPath);
  const usedKeys = extractUsedKeys(htmlFiles);
  
  console.log(`${colors.bold}Total de clés de traduction: ${allKeys.size}${colors.reset}`);
  console.log(`${colors.bold}Total de clés utilisées: ${usedKeys.size}${colors.reset}\n`);
  
  // Trouver les clés non utilisées
  const unusedKeys = [];
  allKeys.forEach(key => {
    if (!usedKeys.has(key)) {
      unusedKeys.push(key);
    }
  });
  
  // Trouver les clés utilisées mais non définies
  const undefinedKeys = [];
  usedKeys.forEach((files, key) => {
    if (!allKeys.has(key)) {
      undefinedKeys.push({ key, files });
    }
  });
  
  // Afficher les résultats
  if (unusedKeys.length > 0) {
    console.log(`${colors.bold}${colors.red}❌ Clés de traduction NON UTILISÉES (${unusedKeys.length}):${colors.reset}`);
    console.log(`${colors.yellow}Ces clés existent dans translations.js mais ne sont utilisées dans aucun fichier HTML${colors.reset}\n`);
    
    // Grouper par catégorie
    const grouped = {};
    unusedKeys.forEach(key => {
      const category = key.split('.')[0];
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(key);
    });
    
    Object.keys(grouped).sort().forEach(category => {
      console.log(`${colors.bold}${colors.magenta}  [${category}]${colors.reset}`);
      grouped[category].forEach(key => {
        console.log(`    - ${key}`);
      });
      console.log('');
    });
  } else {
    console.log(`${colors.bold}${colors.green}✓ Toutes les clés de traduction sont utilisées!${colors.reset}\n`);
  }
  
  if (undefinedKeys.length > 0) {
    console.log(`${colors.bold}${colors.red}❌ Clés UTILISÉES mais NON DÉFINIES (${undefinedKeys.length}):${colors.reset}`);
    console.log(`${colors.yellow}Ces clés sont utilisées dans les fichiers HTML mais n'existent pas dans translations.js${colors.reset}\n`);
    
    undefinedKeys.forEach(({ key, files }) => {
      console.log(`  ${colors.red}✗${colors.reset} ${key}`);
      console.log(`    ${colors.cyan}Utilisée dans: ${files.join(', ')}${colors.reset}`);
    });
    console.log('');
  } else {
    console.log(`${colors.bold}${colors.green}✓ Toutes les clés utilisées sont définies!${colors.reset}\n`);
  }
  
  // Résumé
  console.log(`${colors.bold}${colors.cyan}=== Résumé ===${colors.reset}`);
  console.log(`${colors.green}✓ Clés utilisées correctement: ${usedKeys.size - undefinedKeys.length}${colors.reset}`);
  console.log(`${colors.yellow}⚠ Clés non utilisées: ${unusedKeys.length}${colors.reset}`);
  console.log(`${colors.red}✗ Clés manquantes: ${undefinedKeys.length}${colors.reset}`);
  
  // Code de sortie
  if (undefinedKeys.length > 0) {
    process.exit(1);
  }
}

// Exécuter
try {
  main();
} catch (error) {
  console.error(`${colors.red}Erreur: ${error.message}${colors.reset}`);
  process.exit(1);
}
