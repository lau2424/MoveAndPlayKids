#!/usr/bin/env node

/**
 * Script de conversion d'images JPG/PNG vers WebP
 * Usage: node convert-to-webp.js [dossier]
 * Par défaut, convertit toutes les images du dossier assets/
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const DEFAULT_QUALITY = 80; // Qualité WebP (0-100, 80 est un bon compromis)
const TARGET_DIR = process.argv[2] || './assets';

/**
 * Convertit une image en WebP
 */
async function convertToWebP(inputPath, outputPath, quality = DEFAULT_QUALITY) {
  try {
    const info = await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = info.size;
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB (${reduction}% plus léger)`);
    
    return { success: true, originalSize, newSize };
  } catch (error) {
    console.error(`❌ Erreur avec ${inputPath}:`, error.message);
    return { success: false, error };
  }
}

/**
 * Trouve toutes les images JPG/PNG dans un dossier
 */
function findImages(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🖼️  Conversion d\'images en WebP\n');
  console.log(`📁 Dossier: ${TARGET_DIR}`);
  console.log(`⚙️  Qualité: ${DEFAULT_QUALITY}\n`);

  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌ Le dossier ${TARGET_DIR} n'existe pas`);
    process.exit(1);
  }

  const images = findImages(TARGET_DIR);
  
  if (images.length === 0) {
    console.log('ℹ️  Aucune image JPG/PNG trouvée');
    return;
  }

  console.log(`📸 ${images.length} image(s) trouvée(s)\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let successCount = 0;

  for (const image of images) {
    const inputPath = path.join(TARGET_DIR, image);
    const outputPath = path.join(TARGET_DIR, image.replace(/\.(jpe?g|png)$/i, '.webp'));
    
    const result = await convertToWebP(inputPath, outputPath);
    
    if (result.success) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      successCount++;
    }
    
    console.log(''); // Ligne vide entre chaque image
  }

  // Résumé
  console.log('━'.repeat(50));
  console.log(`\n✨ Conversion terminée: ${successCount}/${images.length} réussie(s)`);
  
  if (successCount > 0) {
    const totalReduction = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
    console.log(`📊 Total: ${(totalOriginal / 1024).toFixed(0)} KB → ${(totalNew / 1024).toFixed(0)} KB`);
    console.log(`💾 Gain: ${totalReduction}% (${((totalOriginal - totalNew) / 1024).toFixed(0)} KB économisés)`);
  }
  
  console.log('\n💡 Les fichiers originaux sont conservés.');
  console.log('   Tu peux les supprimer manuellement si tout fonctionne bien.\n');
}

// Vérifier si sharp est installé
try {
  require.resolve('sharp');
  main().catch(console.error);
} catch (e) {
  console.error('❌ Le package "sharp" n\'est pas installé.');
  console.error('   Installe-le avec: npm install sharp\n');
  process.exit(1);
}
