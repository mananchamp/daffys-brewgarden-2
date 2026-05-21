/**
 * Convert all PNG/JPG images in /public to WebP format
 * Preserves originals, creates .webp versions alongside them
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';
const QUALITY = 80;
const MAX_WIDTH = 1920; // Max dimension for background images
const GLASS_MAX = 800;  // Smaller for glass/item images

async function convertImages() {
  const files = await readdir(PUBLIC_DIR);
  const imageFiles = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  
  console.log(`Found ${imageFiles.length} images to convert\n`);
  
  let totalOriginal = 0;
  let totalConverted = 0;

  for (const file of imageFiles) {
    const inputPath = join(PUBLIC_DIR, file);
    const name = basename(file, extname(file));
    const outputPath = join(PUBLIC_DIR, `${name}.webp`);
    
    const inputStat = await stat(inputPath);
    const inputSize = inputStat.size;
    totalOriginal += inputSize;

    // Determine max width based on image type
    const isBackground = file.startsWith('bg_');
    const isLargeItem = file.startsWith('Hefeweizen') || file.startsWith('IPA') || 
                        file.startsWith('Lager') || file.startsWith('Mead') ||
                        file.startsWith('Nitro') || file.startsWith('Specialty') ||
                        file.startsWith('Whisky') || file.startsWith('Wit') ||
                        file.startsWith('1st');
    const maxW = isBackground ? MAX_WIDTH : (isLargeItem ? 1200 : GLASS_MAX);

    try {
      const result = await sharp(inputPath)
        .resize({ width: maxW, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(outputPath);
      
      const outputStat = await stat(outputPath);
      totalConverted += outputStat.size;
      
      const reduction = ((1 - outputStat.size / inputSize) * 100).toFixed(1);
      console.log(`  ✅ ${file.padEnd(40)} ${(inputSize/1024).toFixed(0).padStart(7)} KB → ${(outputStat.size/1024).toFixed(0).padStart(7)} KB  (-${reduction}%)`);
    } catch (err) {
      console.log(`  ❌ ${file}: ${err.message}`);
    }
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Total original:  ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Total WebP:      ${(totalConverted / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Savings:         ${((1 - totalConverted/totalOriginal) * 100).toFixed(1)}%`);
  console.log(`${'═'.repeat(60)}`);
}

convertImages();
