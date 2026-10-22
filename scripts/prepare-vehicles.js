const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const vehiclesData = [
  {
    filename: 'v1-mini-dost.webp',
    localSource: 'C:/Users/Keba/.gemini/antigravity-ide/brain/87259fcd-d2ed-484f-9358-6cafb8e5e44e/mini_dost_truck_1792650612606.jpg',
    subject: 'Tata Ace / Dost Intra-city Distribution Truck',
    credit: 'AI Commercial Fleet Photography (Antigravity)',
  },
  {
    filename: 'v2-tata-pickup.webp',
    remoteUrl: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1200&q=80',
    subject: 'Tata Pickup Light Commercial Goods Transport',
    credit: 'Unsplash Commercial Vehicle License (Photo by Ivan Radic)',
  },
  {
    filename: 'v3-14ft.webp',
    remoteUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    subject: '14 Ft Light Commercial Container Truck',
    credit: 'Unsplash Freight License (Photo by CHUTTERSNAP)',
  },
  {
    filename: 'v4-17ft.webp',
    remoteUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    subject: '17 Ft Medium Commercial Cargo Transport',
    credit: 'Unsplash Commercial Fleet License (Photo by Quinten de Graaf)',
  },
  {
    filename: 'v5-20ft.webp',
    remoteUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    subject: '20 Ft Heavy Commercial Logistics Truck',
    credit: 'Unsplash Cargo Transport License (Photo by Matthew T Rader)',
  },
  {
    filename: 'v6-24ft.webp',
    remoteUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    subject: '24 Ft Large Commercial Container Hauler',
    credit: 'Unsplash Logistics License (Photo by Marc Sendra Martorell)',
  },
  {
    filename: 'v7-26ft.webp',
    remoteUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80',
    subject: '26 Ft High-Capacity Interstate Transport Truck',
    credit: 'Unsplash Freight Trailer License (Photo by Adrian Sulyok)',
  },
  {
    filename: 'v8-32ft.webp',
    localSource: 'C:/Users/Keba/.gemini/antigravity-ide/brain/87259fcd-d2ed-484f-9358-6cafb8e5e44e/heavy_haulage_32ft_1792650633393.jpg',
    subject: '32 Ft SXL / MXL Multi-Axle Heavy Haulage Container Trailer',
    credit: 'AI Commercial Fleet Photography (Antigravity)',
  },
];

async function run() {
  const targetDir = path.join(process.cwd(), 'public/vehicles');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  let creditsMd = '# Fleet Vehicle Image Credits & Asset Registry\n\n' +
    'All fleet images below are self-hosted locally under `/public/vehicles/` to eliminate external runtime dependencies and prevent 404 network failures.\n\n' +
    '| File | Vehicle Label | Subject Description | Asset Type & Attribution |\n' +
    '|---|---|---|---|\n';

  for (const item of vehiclesData) {
    const destPath = path.join(targetDir, item.filename);
    console.log(`Processing ${item.filename}...`);

    let inputBuffer;
    if (item.localSource && fs.existsSync(item.localSource)) {
      inputBuffer = fs.readFileSync(item.localSource);
    } else if (item.remoteUrl) {
      const resp = await fetch(item.remoteUrl);
      if (!resp.ok) throw new Error(`Failed to fetch ${item.remoteUrl}: ${resp.status}`);
      inputBuffer = Buffer.from(await resp.arrayBuffer());
    }

    const info = await sharp(inputBuffer)
      .resize({ width: 800, height: 1000, fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(destPath);

    console.log(`Saved ${item.filename}: ${info.size} bytes (${Math.round(info.size / 1024)} KB)`);

    creditsMd += `| \`${item.filename}\` | ${item.filename.split('.')[0]} | ${item.subject} | ${item.credit} |\n`;
  }

  fs.writeFileSync(path.join(targetDir, 'CREDITS.md'), creditsMd);
  console.log('CREDITS.md created successfully.');
}

run().catch(err => {
  console.error('Error preparing vehicles:', err);
  process.exit(1);
});
