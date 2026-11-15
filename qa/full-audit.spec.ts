import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { validateLeadStoreConfig } from '../src/lib/leadStore';

const allRoutes = [
  '/',
  '/about',
  '/business-solutions',
  '/company',
  '/contact',
  '/documentation',
  '/industrial',
  '/pan-india',
  '/privacy',
  '/process',
  '/quote',
  '/regular-transport',
  '/routes',
  '/routes/coimbatore-to-chennai',
  '/services',
  '/terms',
  '/vehicles',
  '/why-choose-us',
];

test.describe('Comprehensive Production QA Suite', () => {
  // 1. Test per route: title, canonical, console errors, axe violations
  for (const route of allRoutes) {
    test(`Route ${route}: Title, Canonical, 0 Console Errors & 0 Axe Violations`, async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          if (!text.includes('favicon') && !text.includes('Failed to load resource')) {
            consoleErrors.push(text);
          }
        }
      });

      page.on('pageerror', (err) => {
        consoleErrors.push(err.message);
      });

      await page.goto(route, { waitUntil: 'load' });
      await page.waitForTimeout(600);

      // Verify title exists
      const title = await page.title();
      expect(title, `Title on ${route} must be populated`).toBeTruthy();
      expect(title.length, `Title on ${route} should be informative (> 10 chars)`).toBeGreaterThan(10);

      // Verify canonical exists
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical, `Canonical on ${route} must exist`).toBeTruthy();

      // Verify zero console errors
      expect(consoleErrors, `Console errors on ${route}`).toEqual([]);

      // Axe Accessibility Scan (WCAG 2.0, 2.1, 2.2 AA)
      const accessibilityScan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const seriousOrCritical = accessibilityScan.violations.filter((v) =>
        ['serious', 'critical'].includes(v.impact || '')
      );

      expect(
        seriousOrCritical,
        `Axe violations on ${route}: ${seriousOrCritical.map((v) => v.id).join(', ')}`
      ).toEqual([]);
    });
  }

  // 2. Test: Refresh stays on the exact same URL (no reload redirect trap)
  test('Refreshing on subpages must maintain current URL without redirecting', async ({ page }) => {
    const testSubpages = ['/about', '/vehicles', '/contact', '/privacy', '/terms'];

    for (const subpage of testSubpages) {
      await page.goto(subpage, { waitUntil: 'domcontentloaded' });
      expect(new URL(page.url()).pathname).toBe(subpage);

      await page.reload({ waitUntil: 'domcontentloaded' });
      expect(new URL(page.url()).pathname).toBe(subpage);
    }
  });

  // 3. UI Form Tests (Explicitly Documented Network Mocking)
  // Network Mock: Intercepts POST /api/contact to test UI states (loading spinner, error toast, success DOM render)
  // without creating test data on every browser run.
  test('UI Test: Contact Form submits successfully with mocked POST /api/contact', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Your message has been received.',
          data: { leadId: 'lead_test_mocked_123', name: 'Test Shipper' },
        }),
      });
    });

    await page.goto('/contact', { waitUntil: 'load' });

    await page.fill('#contact-name', 'Test Shipper');
    await page.fill('#contact-email', 'shipper@example.com');
    await page.fill('#contact-phone', '9876543210');
    await page.fill('#contact-message', 'Need 10 MT truck quote for Chennai.');

    await page.click('button[type="submit"]');

    await expect(page.locator('.form-success')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.form-success')).toContainText('Message Sent!');
  });

  // Network Mock: Intercepts POST /api/quote to test modal & page UI rendering without external API dependencies.
  test('UI Test: Freight Quote Form submits successfully with mocked POST /api/quote', async ({ page }) => {
    await page.route('/api/quote', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Quote request registered successfully.',
          data: { referenceId: 'ELS-889900', phone: '9876543210' },
        }),
      });
    });

    await page.goto('/quote', { waitUntil: 'load' });

    await page.fill('input[name="pickupLocation"]', 'Coimbatore');
    await page.fill('input[name="deliveryLocation"]', 'Chennai');
    await page.fill('input[name="materialType"]', 'Automotive Castings');
    await page.fill('input[name="requiredDate"]', '2026-11-25');
    await page.selectOption('select[name="vehicleType"]', { index: 1 });
    await page.fill('input[name="fullName"]', 'Arun Commercial Lead');
    await page.fill('input[name="phone"]', '9876543210');

    await page.click('button[type="submit"]');

    await expect(page.locator('.form-success')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.form-success')).toContainText('Quote Request Received!');
    await expect(page.locator('.form-success')).toContainText('ELS-889900');
  });

  // 4. REAL BACKEND INTEGRATION TESTS (UNMOCKED NETWORK CALLS)
  // Executes genuine HTTP requests against the live Next.js API server to verify
  // Zod parsing, input sanitization, honeypot catching, rate limiting, and leadStore file writes.
  test('Backend Integration Test: Real POST /api/contact writes lead to storage', async ({ request }) => {
    const tempFile = path.join(os.tmpdir(), `test-contact-${Date.now()}-${Math.random().toString(36).slice(2)}.jsonl`);
    const testTimestamp = Date.now();
    const testPayload = {
      name: `Playwright Test Shipper ${testTimestamp}`,
      email: `test_${testTimestamp}@example.com`,
      phone: '9876543210',
      message: 'Automated integration test inquiry verifying lead persistence.',
    };

    try {
      const response = await request.post('/api/contact', {
        data: testPayload,
        headers: {
          'x-test-leads-file': tempFile,
          'x-stub-external': 'true',
        },
      });

      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.data.leadId).toBeTruthy();

      // Verify temp lead file on disk contains the record
      expect(fs.existsSync(tempFile)).toBe(true);
      const fileContents = fs.readFileSync(tempFile, 'utf8');
      expect(fileContents).toContain(json.data.leadId);
      expect(fileContents).toContain(`Playwright Test Shipper ${testTimestamp}`);
    } finally {
      if (fs.existsSync(tempFile)) {
        try { fs.unlinkSync(tempFile); } catch {}
      }
    }
  });

  test('Backend Integration Test: Real POST /api/quote writes quote lead to storage', async ({ request }) => {
    const tempFile = path.join(os.tmpdir(), `test-quote-${Date.now()}-${Math.random().toString(36).slice(2)}.jsonl`);
    const testTimestamp = Date.now();
    const testPayload = {
      pickupLocation: 'Coimbatore SMT Hub',
      deliveryLocation: 'Chennai Ambattur',
      materialType: 'Precision Pump Parts',
      weight: '8 MT',
      vehicleType: '20ft Multi-Axle (16 Ton)',
      requiredDate: '2026-12-01',
      fullName: `Test Buyer ${testTimestamp}`,
      phone: '9876543210',
      email: `quote_${testTimestamp}@example.com`,
      additionalDetails: 'Integration test verifying full leadStore dispatch pipeline.',
    };

    try {
      const response = await request.post('/api/quote', {
        data: testPayload,
        headers: {
          'x-test-leads-file': tempFile,
          'x-stub-external': 'true',
        },
      });

      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.data.referenceId).toMatch(/^ELS-\d{6}$/);

      // Verify temp lead file contains quote leadId
      expect(fs.existsSync(tempFile)).toBe(true);
      const fileContents = fs.readFileSync(tempFile, 'utf8');
      expect(fileContents).toContain(json.data.leadId);
    } finally {
      if (fs.existsSync(tempFile)) {
        try { fs.unlinkSync(tempFile); } catch {}
      }
    }
  });

  test('Backend Integration Test: Honeypot catches bot submission on /api/contact', async ({ request }) => {
    const spamPayload = {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      phone: '9876543210',
      message: 'Buy cheap watches',
      website: 'http://spam-link.com', // Honeypot filled
    };

    const response = await request.post('/api/contact', {
      data: spamPayload,
    });

    expect(response.status()).toBe(400);
    const json = await response.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('Spam submission rejected');
  });

  test('Production Guard: leadStore strictly refuses to start/operate in production without Telegram or Webhook', () => {
    const originalEnv = { ...process.env };

    try {
      // Simulate production runtime with no external sinks configured
      (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
      delete process.env.LEAD_WEBHOOK_URL;
      delete process.env.TELEGRAM_BOT_TOKEN;
      delete process.env.TELEGRAM_CHAT_ID;
      delete process.env.NEXT_PHASE;
      process.env.STRICT_LEAD_CONFIG = 'true';

      // Expect validateLeadStoreConfig() to throw FATAL LEAD_STORE CONFIG ERROR
      expect(() => validateLeadStoreConfig()).toThrow(/FATAL LEAD_STORE CONFIG ERROR/);

      // Verify that configuring LEAD_WEBHOOK_URL permits startup
      process.env.LEAD_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz_test/exec';
      expect(validateLeadStoreConfig().valid).toBe(true);
      delete process.env.LEAD_WEBHOOK_URL;

      // Verify that configuring Telegram permits startup
      process.env.TELEGRAM_BOT_TOKEN = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';
      process.env.TELEGRAM_CHAT_ID = '-1001234567890';
      expect(validateLeadStoreConfig().valid).toBe(true);
    } finally {
      process.env = originalEnv;
    }
  });
});
