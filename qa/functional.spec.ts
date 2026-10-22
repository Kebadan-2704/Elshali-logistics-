import { test, expect } from '@playwright/test';

test.describe('Functional Testing', () => {
  test('Navbar links scroll and target valid sections', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const sections = ['#about', '#services', '#vehicles', '#routes', '#contact'];
    for (const hash of sections) {
      const link = page.locator(`.navbar-capsule a[href="${hash}"]`);
      await link.click();
      await page.waitForTimeout(600);
      const target = page.locator(hash);
      await expect(target).toBeVisible();
    }
  });

  test('Navbar GET A QUOTE button opens modal', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.locator('.nav-cta').click();
    const modal = page.locator('.modal-panel');
    await expect(modal).toBeVisible();
    await expect(page.locator('#quote-modal-title')).toHaveText('Request Freight Rate Quote');

    // Close with ESC
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Vehicle card REQUEST VEHICLE button preselects vehicle in modal', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const vehicleSection = page.locator('#vehicles');
    await vehicleSection.scrollIntoViewIfNeeded();

    // Click request vehicle on the active card
    const requestBtn = page.locator('.vehicle-card.active .vehicle-request-btn').first();
    await requestBtn.click();

    const modal = page.locator('.modal-panel');
    await expect(modal).toBeVisible();

    // Check that vehicle select has a value
    const select = page.locator('#q-vehicle');
    const value = await select.inputValue();
    expect(value.length).toBeGreaterThan(0);

    // Close with X button
    await page.locator('.modal-close').click();
    await expect(modal).not.toBeVisible();
  });

  test('Modal validation and submission flow', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.locator('.nav-cta').click();

    // Fill valid form fields
    await page.fill('#q-pickup', 'Coimbatore, Tamil Nadu');
    await page.fill('#q-delivery', 'Chennai, Tamil Nadu');
    await page.fill('#q-material', 'Textile Machinery');
    await page.fill('#q-weight', '5 Tons');
    await page.fill('#q-date', '2026-11-01');
    await page.fill('#q-name', 'Sundar Rajan');
    await page.fill('#q-phone', '9876543210');
    await page.fill('#q-email', 'sundar@example.com');

    // Submit
    await page.locator('.modal-submit').click();

    // Verify success confirmation
    await expect(page.locator('.form-success')).toBeVisible({ timeout: 4000 });
    await expect(page.locator('.form-success h4')).toHaveText('Quote Request Submitted!');
  });

  test('Contact form submission flow', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    await page.fill('#contact-name', 'Karthik Raja');
    await page.fill('#contact-email', 'karthik@example.com');
    await page.fill('#contact-phone', '9876543210');
    await page.fill('#contact-message', 'Need transportation for 10 tons freight weekly.');

    await page.locator('.form-submit').click();

    await expect(page.locator('.form-success')).toBeVisible({ timeout: 4000 });
  });
});
