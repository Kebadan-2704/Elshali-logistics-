import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Audit all images on http://localhost:3000', async ({ page }) => {
  const failedUrls: string[] = [];
  page.on('response', (res) => {
    if (res.status() >= 400 && res.request().resourceType() === 'image') {
      failedUrls.push(`${res.status()} ${res.url()}`);
    }
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Scroll to trigger lazy loading
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);

  const images = await page.$$eval('img', (els) =>
    els.map((img) => {
      const rect = img.getBoundingClientRect();
      return {
        src: img.currentSrc || img.src,
        alt: img.getAttribute('alt'),
        hasAltAttr: img.hasAttribute('alt'),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderedWidth: Math.round(rect.width),
        renderedHeight: Math.round(rect.height),
        isLoaded: img.complete && img.naturalWidth > 0,
        loading: img.getAttribute('loading'),
        decoding: img.getAttribute('decoding'),
      };
    })
  );

  const backgroundImages = await page.$$eval('*', (els) =>
    els
      .map((el) => {
        const bg = window.getComputedStyle(el).backgroundImage;
        return bg && bg !== 'none' && bg.startsWith('url(') ? bg : null;
      })
      .filter(Boolean)
  );

  // Write image audit report JSON
  const reportsDir = path.join(process.cwd(), 'qa', 'reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDir, 'images-audit.json'),
    JSON.stringify({ images, backgroundImages, failedUrls }, null, 2)
  );

  console.log(`Found ${images.length} <img> elements, ${backgroundImages.length} CSS background images`);
  console.log(`Failed image requests: ${failedUrls.length}`);

  const broken = images.filter((i) => !i.isLoaded);
  const missingAlt = images.filter((i) => !i.hasAltAttr);

  console.log(`Broken images: ${broken.length}`);
  console.log(`Missing alt attribute: ${missingAlt.length}`);

  expect(failedUrls, 'No failed image requests').toEqual([]);
  expect(broken, 'Zero broken images').toEqual([]);
  expect(missingAlt, 'All images have alt attribute').toEqual([]);
});
