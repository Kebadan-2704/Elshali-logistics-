const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processLogo() {
  const sourcePath = path.resolve(__dirname, '../Elshali.png');
  console.log('Processing real brand logo from:', sourcePath);

  // 1. Trim transparency if any
  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  console.log(`Source dimensions: ${metadata.width}x${metadata.height}`);

  // 2. High-res crisp WebP for Navbar, Footer, Splash
  const webpBuffer = await sharp(sourcePath)
    .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .webp({ quality: 85, effort: 6 })
    .toBuffer();

  const outWebp = path.resolve(__dirname, '../public/images/elshali-logo.webp');
  const legacyWebp = path.resolve(__dirname, '../public/images/elsali-logo.webp');
  fs.writeFileSync(outWebp, webpBuffer);
  fs.writeFileSync(legacyWebp, webpBuffer); // keep for backward compatibility
  console.log(`Saved logo webp (${webpBuffer.length} bytes / ${Math.round(webpBuffer.length/1024)} KB)`);

  // 3. Generate favicons
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  for (const s of sizes) {
    await sharp(sourcePath)
      .resize(s, s, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.resolve(__dirname, `../public/icon-${s}.png`));
  }

  const icon32 = await sharp(sourcePath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.resolve(__dirname, '../src/app/favicon.ico'), icon32);
  fs.writeFileSync(path.resolve(__dirname, '../public/favicon.ico'), icon32);
  fs.writeFileSync(path.resolve(__dirname, '../src/app/icon.png'), icon32);
  fs.writeFileSync(path.resolve(__dirname, '../public/icon.png'), icon32);

  const icon180 = await sharp(sourcePath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.resolve(__dirname, '../src/app/apple-icon.png'), icon180);
  fs.writeFileSync(path.resolve(__dirname, '../public/apple-icon.png'), icon180);

  console.log('Successfully generated all Elshali logo and favicon assets!');
}

processLogo().catch(console.error);

