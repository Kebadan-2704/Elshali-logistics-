import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

test.describe('Accessibility Audit (axe-core)', () => {
  test('Audit initial page load', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const reportsDir = path.join(process.cwd(), 'qa', 'reports');
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(
      path.join(reportsDir, 'a11y-page-load.json'),
      JSON.stringify(accessibilityScanResults, null, 2)
    );

    const seriousOrCritical = accessibilityScanResults.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact || '')
    );

    console.log(
      `Initial page: ${accessibilityScanResults.violations.length} total violations (${seriousOrCritical.length} serious/critical)`
    );

    expect(seriousOrCritical, 'No serious or critical a11y violations on page load').toEqual([]);
  });

  test('Audit Modal Open state', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Open quote modal
    await page.locator('.nav-cta').click();
    await page.waitForSelector('.modal-panel');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const reportsDir = path.join(process.cwd(), 'qa', 'reports');
    fs.writeFileSync(
      path.join(reportsDir, 'a11y-modal-open.json'),
      JSON.stringify(accessibilityScanResults, null, 2)
    );

    const seriousOrCritical = accessibilityScanResults.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact || '')
    );

    console.log(
      `Modal open: ${accessibilityScanResults.violations.length} total violations (${seriousOrCritical.length} serious/critical)`
    );

    expect(seriousOrCritical, 'No serious or critical a11y violations in modal').toEqual([]);
  });
});
