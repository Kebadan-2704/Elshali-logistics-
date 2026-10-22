const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const sourcePath = path.resolve(__dirname, '../../Elsali .png');
  console.log('Reading source logo from:', sourcePath);

  // 1. Extract the globe emblem (top 0 to 2535 of trimmed image)
  const globeTrimmed = await sharp(sourcePath)
    .trim()
    .extract({ left: 0, top: 0, width: 5392, height: 2535 })
    .trim()
    .toBuffer();

  // Test badged vs transparent
  // A. Transparent globe with high sharpness
  const sizes = [16, 32, 48, 64, 180, 192, 512];

  for (const size of sizes) {
    // Generate transparent icon
    await sharp(globeTrimmed)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.resolve(__dirname, `../public/icon-${size}.png`));
  }

  // Generate standard Next.js app icons:
  // 1. src/app/icon.png (32x32)
  await sharp(globeTrimmed)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve(__dirname, '../src/app/icon.png'));

  // 2. src/app/apple-icon.png (180x180)
  await sharp(globeTrimmed)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve(__dirname, '../src/app/apple-icon.png'));

  // 3. public/favicon.ico and src/app/favicon.ico
  // Modern browsers accept PNG-based ICO or 32x32 PNG as icon
  // Sharp can output PNG which we can write to favicon.ico (valid in modern browsers)
  // or multi-layer PNG/ICO
  const icon32Buffer = await sharp(globeTrimmed)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.resolve(__dirname, '../src/app/favicon.ico'), icon32Buffer);
  fs.writeFileSync(path.resolve(__dirname, '../public/favicon.ico'), icon32Buffer);
  fs.writeFileSync(path.resolve(__dirname, '../public/icon.png'), icon32Buffer);
  fs.writeFileSync(path.resolve(__dirname, '../public/apple-icon.png'), await sharp(globeTrimmed)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  );

  console.log('Successfully generated all favicon assets!');
}

generateFavicons().catch(console.error);
