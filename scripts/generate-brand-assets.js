const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const sourcePath = path.resolve(__dirname, '../Elshali.png');
  console.log('Extracting emblem from:', sourcePath);

  // 1. Extract Globe from Elshali.png (bbox: left: 1036, top: 774, width: 2254, height: 1671)
  const globe = await sharp(sourcePath)
    .extract({ left: 1036, top: 774, width: 2254, height: 1671 })
    .toBuffer();

  // 2. High-res transparent emblem (512x512)
  const emblemBuffer = await sharp(globe)
    .resize(480, 480, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 16, bottom: 16, left: 16, right: 16, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95 })
    .toFile(path.resolve(__dirname, '../public/images/elshali-emblem.webp'));

  console.log('Saved public/images/elshali-emblem.webp:', emblemBuffer);

  // 3. Render a circular luxury badge (512x512)
  const size = 512;
  const padding = 56;
  const iconSize = size - padding * 2; // 400x400

  const resizedIcon = await sharp(globe)
    .resize(iconSize, iconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Create badge SVG with smooth circular frame, pure white radiant backdrop, and subtle magenta rim
  const badgeSvg = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#F8FAFC" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EC4899" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#B8006D" stop-opacity="0.9" />
        </linearGradient>
      </defs>
      <!-- Base circle with subtle gradient -->
      <circle cx="256" cy="256" r="248" fill="url(#bgGrad)" stroke="url(#rimGrad)" stroke-width="8" />
      <circle cx="256" cy="256" r="240" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="2" />
    </svg>
  `);

  await sharp(badgeSvg)
    .composite([{ input: resizedIcon, top: padding, left: padding }])
    .webp({ quality: 95 })
    .toFile(path.resolve(__dirname, '../public/images/elshali-badge.webp'));

  console.log('Saved public/images/elshali-badge.webp');

  // Also create a crisp 128x128 version for Navbar and Favicons
  const badge128 = path.resolve(__dirname, '../public/images/elshali-badge-128.webp');
  await sharp(path.resolve(__dirname, '../public/images/elshali-badge.webp'))
    .resize(128, 128)
    .webp({ quality: 95 })
    .toFile(badge128);

  console.log('Saved public/images/elshali-badge-128.webp');

  // Generate crisp favicons from the new badge
  const badgeSource = path.resolve(__dirname, '../public/images/elshali-badge.webp');
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  for (const s of sizes) {
    await sharp(badgeSource)
      .resize(s, s)
      .png()
      .toFile(path.resolve(__dirname, `../public/icon-${s}.png`));
  }

  const icon32 = await sharp(badgeSource).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.resolve(__dirname, '../public/favicon.ico'), icon32);
  fs.writeFileSync(path.resolve(__dirname, '../src/app/favicon.ico'), icon32);
  fs.writeFileSync(path.resolve(__dirname, '../public/icon.png'), icon32);
  fs.writeFileSync(path.resolve(__dirname, '../src/app/icon.png'), icon32);

  const icon180 = await sharp(badgeSource).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.resolve(__dirname, '../public/apple-icon.png'), icon180);
  fs.writeFileSync(path.resolve(__dirname, '../src/app/apple-icon.png'), icon180);

  console.log('All favicons updated successfully!');
  console.log('All brand assets generated successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
