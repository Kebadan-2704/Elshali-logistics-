import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const viewports = [
  // Phones (portrait)
  { name: 'phone-320', w: 320, h: 568 },
  { name: 'phone-360', w: 360, h: 640 },
  { name: 'phone-375', w: 375, h: 667 },
  { name: 'phone-390', w: 390, h: 844 },
  { name: 'phone-393', w: 393, h: 852 },
  { name: 'phone-412', w: 412, h: 915 },
  { name: 'phone-414', w: 414, h: 896 },
  { name: 'phone-428', w: 428, h: 926 },
  { name: 'phone-430', w: 430, h: 932 },
  // Phones (landscape)
  { name: 'phone-land-568', w: 568, h: 320 },
  { name: 'phone-land-667', w: 667, h: 375 },
  { name: 'phone-land-844', w: 844, h: 390 },
  { name: 'phone-land-915', w: 915, h: 412 },
  { name: 'phone-land-932', w: 932, h: 430 },
  // Small tablets / foldables
  { name: 'foldable-540', w: 540, h: 720 },
  { name: 'tablet-600', w: 600, h: 960 },
  { name: 'foldable-712', w: 712, h: 1024 },
  // Breakpoint edges
  { name: 'edge-639', w: 639, h: 800 },
  { name: 'edge-640', w: 640, h: 800 },
  { name: 'edge-767', w: 767, h: 800 },
  { name: 'edge-768', w: 768, h: 800 },
  { name: 'edge-1023', w: 1023, h: 800 },
  { name: 'edge-1024', w: 1024, h: 800 },
  { name: 'edge-1279', w: 1279, h: 800 },
  { name: 'edge-1280', w: 1280, h: 800 },
  // Tablets (portrait)
  { name: 'tablet-768', w: 768, h: 1024 },
  { name: 'tablet-810', w: 810, h: 1080 },
  { name: 'tablet-820', w: 820, h: 1180 },
  { name: 'tablet-834', w: 834, h: 1194 },
  { name: 'tablet-912', w: 912, h: 1368 },
  // Tablets (landscape)
  { name: 'tablet-land-1024', w: 1024, h: 768 },
  { name: 'tablet-land-1112', w: 1112, h: 834 },
  { name: 'tablet-land-1180', w: 1180, h: 820 },
  { name: 'tablet-land-1366', w: 1366, h: 1024 },
  // Desktops / Laptops
  { name: 'desktop-1280', w: 1280, h: 720 },
  { name: 'desktop-1366', w: 1366, h: 768 },
  { name: 'desktop-1440', w: 1440, h: 900 },
  { name: 'desktop-1536', w: 1536, h: 864 },
  { name: 'desktop-1680', w: 1680, h: 1050 },
  { name: 'desktop-1920', w: 1920, h: 1080 },
  { name: 'desktop-2048', w: 2048, h: 1152 },
  // Large / Ultrawide
  { name: 'ultrawide-2560', w: 2560, h: 1440 },
  { name: 'ultrawide-3440', w: 3440, h: 1440 },
  { name: 'ultrawide-3840', w: 3840, h: 2160 },
];

test.describe('Viewport Matrix Audit', () => {
  for (const vp of viewports) {
    test(`Viewport ${vp.w}x${vp.h} (${vp.name})`, async ({ page }, testInfo) => {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('requestfailed', (req) => {
        failedRequests.push(req.url());
      });

      page.on('response', (res) => {
        if (res.status() >= 400) {
          failedRequests.push(`${res.status()} ${res.url()}`);
        }
      });

      await page.setViewportSize({ width: vp.w, height: vp.h });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

      // Scroll to trigger reveals and lazy images
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.7) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 100));
        }
        window.scrollTo(0, 0);
      });

      await page.waitForTimeout(400);

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        const sw = document.documentElement.scrollWidth;
        const iw = window.innerWidth;
        const offenders: string[] = [];

        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > iw + 1.5 && r.width > 0) {
            const tag = el.tagName.toLowerCase();
            const cls = typeof el.className === 'string' ? el.className.split(' ').slice(0, 2).join('.') : '';
            offenders.push(`${tag}.${cls}`);
          }
        });

        return {
          scrollWidth: sw,
          innerWidth: iw,
          hasOverflow: sw > iw + 1,
          offenders: offenders.slice(0, 10),
        };
      });

      // Save screenshot
      const screenDir = path.join(process.cwd(), 'qa', 'reports', 'screens');
      if (!fs.existsSync(screenDir)) fs.mkdirSync(screenDir, { recursive: true });
      await page.screenshot({
        path: path.join(screenDir, `${vp.w}x${vp.h}-${vp.name}-full.png`),
        fullPage: true,
      });

      expect.soft(overflow.hasOverflow, `Overflow at ${vp.w}x${vp.h} (${overflow.scrollWidth} > ${overflow.innerWidth}): ${overflow.offenders.join(', ')}`).toBe(false);
      expect.soft(consoleErrors, `Console errors at ${vp.w}x${vp.h}`).toEqual([]);
      expect.soft(failedRequests, `Failed network requests at ${vp.w}x${vp.h}`).toEqual([]);
    });
  }
});
