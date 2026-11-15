import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const inputPath = path.resolve('public/images/hero-logistics.webp');
const outputPath = path.resolve('public/images/hero-logistics-mobile.webp');

async function run() {
  const meta = await sharp(inputPath).metadata();
  console.log(`Original image: ${meta.width}x${meta.height}, format: ${meta.format}`);

  // Mobile hero: 750px width (covers standard 360-430px @ 2x DPR mobile screens), WebP quality ~75
  await sharp(inputPath)
    .resize({ width: 750, withoutEnlargement: true })
    .webp({ quality: 75, effort: 6 })
    .toFile(outputPath);

  const outStat = fs.statSync(outputPath);
  console.log(`Generated mobile hero at: ${outputPath}`);
  console.log(`File size: ${(outStat.size / 1024).toFixed(1)} KB (${outStat.size} bytes)`);

  if (outStat.size > 45 * 1024) {
    console.warn(`File exceeds 45 KB, re-compressing with quality 68...`);
    await sharp(inputPath)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 68, effort: 6 })
      .toFile(outputPath);
    const finalStat = fs.statSync(outputPath);
    console.log(`Final file size: ${(finalStat.size / 1024).toFixed(1)} KB`);
  }
}

run().catch(console.error);

