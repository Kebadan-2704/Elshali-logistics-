const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// File mapping from Clients/ folder to destination webp names
const fileMap = {
  'ABB.png': 'abb.webp',
  'ACC.png': 'acc.webp',
  'Ashok Leyland.png': 'ashok-leyland.webp',
  'asian paints.jpg': 'asian-paints.webp',
  'Berger.png': 'berger.webp',
  'bonfiglioli.jpg': 'bonfiglioli.webp',
  'Bosch.png': 'bosch.webp',
  'Britannia.png': 'britannia.webp',
  'Caterpillar.png': 'caterpillar.webp',
  'Craftsman automation.jpg': 'craftsman.webp',
  'CRI pumps.png': 'cri-pumps.webp',
  'Dabur.png': 'dabur.webp',
  'ELGI.png': 'elgi.webp',
  'Havells.png': 'havells.webp',
  'Hindhustan.jpg': 'hindustan-unilever.webp',
  'Hyundai.png': 'hyundai.webp',
  'ITC.png': 'itc.webp',
  'Jindal.png': 'jindal.webp',
  'Jsw.png': 'jsw.webp',
  'kirloskar.png': 'kirloskar.webp',
  'L & T.png': 'lt.webp',
  'LG.png': 'lg.webp',
  'LMW.jpg': 'lmw.webp',
  'Mahindra.jpg': 'mahindra.webp',
  'Nestle.png': 'nestle.webp',
  'Panasonic.png': 'panasonic.webp',
  'Pricol.png': 'pricol.webp',
  'propel.png': 'propel.webp',
  'Rabwin.jpg': 'rabwin.webp',
  'Reliance Industries Limited.png': 'reliance.webp',
  'Roots industryy.png': 'roots.webp',
  'Saint gobalin.png': 'saint-gobain.webp',
  'Samsung.png': 'samsung.webp',
  'Schneider electric.png': 'schneider.webp',
  'Shanthi Gears.jpg': 'shanthi-gears.webp',
  'Siemens.png': 'siemens.webp',
  'Suguna.png': 'suguna-foods.webp',
  'Suzlon.png': 'suzlon.webp',
  'Tata Motors.png': 'tata-motors.webp',
  'Tata Steel.png': 'tata-steel.webp',
  'Texmo.png': 'texmo.webp',
  'Titian Company.png': 'titan.webp',
  'Toshiba.png': 'toshiba.webp',
  'TVS.png': 'tvs.webp',
  'Ultratech.png': 'ultratech.webp',
  'V Guard.png': 'v-guard.webp',
  'voith.png': 'voith.webp',
  'Water Tec.png': 'watertec.webp',
  'Yes Square marketing.jpg': 'yes-square-marketing.webp',
};

async function processStandardCanvas() {
  const clientsDir = path.join(process.cwd(), 'Clients');
  const targetDirs = [
    path.join(process.cwd(), 'public', 'client-logos'),
    path.join(process.cwd(), 'public', 'clients')
  ];

  for (const t of targetDirs) {
    if (!fs.existsSync(t)) {
      fs.mkdirSync(t, { recursive: true });
    }
  }

  console.log('Standardizing all 49 logos onto uniform 300x100 white canvas...');
  let successCount = 0;

  for (const [srcFile, destFile] of Object.entries(fileMap)) {
    const srcPath = path.join(clientsDir, srcFile);
    if (!fs.existsSync(srcPath)) {
      console.warn(`WARNING: Source file not found: ${srcPath}`);
      continue;
    }

    try {
      let innerBuffer;

      if (srcFile === 'Yes Square marketing.jpg') {
        innerBuffer = await sharp(srcPath).rotate().resize(76, 76, { fit: 'contain' }).toBuffer();
      } else if (srcFile === 'Rabwin.jpg') {
        const extracted = await sharp(srcPath).rotate().extract({ left: 80, top: 90, width: 490, height: 160 }).toBuffer();
        const trimmed = await sharp(extracted).trim({ threshold: 20 }).toBuffer();
        innerBuffer = await sharp(trimmed).resize({ width: 240, height: 70, fit: 'inside' }).toBuffer();
      } else {
        let pipe = sharp(srcPath).rotate();
        const meta = await pipe.metadata();
        if (meta.hasAlpha) {
          pipe = pipe.flatten({ background: { r: 255, g: 255, b: 255 } });
        }
        try {
          const trimmed = await pipe.trim({ threshold: 15 }).toBuffer();
          pipe = sharp(trimmed);
        } catch (e) {
          // Keep original if trim fails
        }
        innerBuffer = await pipe.resize({ width: 240, height: 70, fit: 'inside' }).toBuffer();
      }

      // Composite centered on a pristine 300x100 white canvas
      const finalBuffer = await sharp({
        create: {
          width: 300,
          height: 100,
          channels: 3,
          background: { r: 255, g: 255, b: 255 }
        }
      })
      .composite([{ input: innerBuffer, gravity: 'center' }])
      .webp({ quality: 92, effort: 6 })
      .toBuffer();

      for (const t of targetDirs) {
        fs.writeFileSync(path.join(t, destFile), finalBuffer);
      }

      console.log(`✓ Processed ${srcFile} -> ${destFile} (300x100 webp)`);
      successCount++;
    } catch (err) {
      console.error(`ERROR processing ${srcFile}:`, err.message);
    }
  }

  console.log(`\nSuccessfully standardized ${successCount} logos into both target directories!`);
}

processStandardCanvas().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
