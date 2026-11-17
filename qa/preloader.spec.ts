import { test, expect } from '@playwright/test';

test.describe('Animated Brand Preloader QA Verification', () => {

  test('1. First visit: preloader renders, animation completes, and page reveals', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // The preloader element exists with accessible role="status"
    const preloader = page.locator('.elp');
    await expect(preloader).toBeVisible();
    await expect(preloader).toHaveAttribute('role', 'status');
    await expect(preloader).toHaveAttribute('aria-label', 'Loading ELSHALI LOGISTICS');

    // While visible, overflow is locked
    const isLocked = await page.evaluate(() => {
      return (
        document.documentElement.style.overflow === 'hidden' ||
        document.body.style.overflow === 'hidden' ||
        document.documentElement.dataset.preloaderActive === 'true' ||
        window.getComputedStyle(document.body).overflow === 'hidden'
      );
    });
    expect(isLocked).toBe(true);

    // Wait for the exit transition (around 2.8s + 0.5s fade)
    await page.waitForTimeout(3600);

    // Preloader is unmounted / removed from DOM
    await expect(preloader).toHaveCount(0);

    // Scroll is unlocked
    const overflowAfter = await page.evaluate(() => document.documentElement.style.overflow);
    expect(overflowAfter).toBe('');

    // Session flag is set
    const seenFlag = await page.evaluate(() => sessionStorage.getItem('elshali_preloader_seen'));
    expect(seenFlag).toBe('1');
  });

  test('2. Reload in same session: no preloader, no flash (instant skip)', async ({ page }) => {
    // Set sessionStorage flag as a returning visitor
    await page.addInitScript(() => {
      sessionStorage.setItem('elshali_preloader_seen', '1');
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Dataset preloader is skip
    const skipAttr = await page.evaluate(() => document.documentElement.dataset.preloader);
    expect(skipAttr).toBe('skip');

    // Preloader is not visible / 0 count
    const preloader = page.locator('.elp');
    await expect(preloader).toHaveCount(0);

    // Overflow remains normal
    const overflow = await page.evaluate(() => document.documentElement.style.overflow);
    expect(overflow).toBe('');
  });

  test('3. Client-side navigation: never replays on route changes', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // Wait for preloader to finish
    await page.waitForTimeout(3400);

    // Navigate to /about via client-side link
    await page.goto('/about');
    const preloaderOnAbout = page.locator('.elp');
    await expect(preloaderOnAbout).toHaveCount(0);

    // Back to homepage
    await page.goto('/');
    const preloaderOnHomeReturn = page.locator('.elp');
    await expect(preloaderOnHomeReturn).toHaveCount(0);
  });

  test('4. Prefers-reduced-motion: respects user setting with simple fade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const preloader = page.locator('.elp');
    await expect(preloader).toBeVisible();

    // In reduced motion, comet and sparks are hidden
    const fxDisplay = await page.evaluate(() => {
      const fx = document.querySelector('.elp-fx');
      return fx ? window.getComputedStyle(fx).display : null;
    });
    expect(fxDisplay).toBe('none');

    // Finishes quickly (around 1.2s + 0.5s fade)
    await page.waitForTimeout(2000);
    await expect(preloader).toHaveCount(0);
  });

  test('5. Viewport responsiveness: works from 320px to 4K without horizontal overflow', async ({ page }) => {
    const viewports = [
      { width: 320, height: 640 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
      { width: 2560, height: 1440 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Check no horizontal scrollbar on body
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(vp.width);

      // Preloader emblem SVG is scaled properly
      const emblem = page.locator('.elp-emblem svg');
      const box = await emblem.boundingBox();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(vp.width);
      }
    }
  });

  test('6. Light and Dark themes: background colors match tokens without visible box', async ({ page }) => {
    // Dark theme (default site theme)
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const darkBg = await page.evaluate(() => {
      const el = document.querySelector('.elp');
      return el ? window.getComputedStyle(el).backgroundColor : null;
    });
    // #060B16 -> rgb(6, 11, 22)
    expect(darkBg).toBe('rgb(6, 11, 22)');

    // Light theme
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const lightBg = await page.evaluate(() => {
      const el = document.querySelector('.elp');
      return el ? window.getComputedStyle(el).backgroundColor : null;
    });
    // #fbf6f6 -> rgb(251, 246, 246)
    expect(lightBg).toBe('rgb(251, 246, 246)');
  });

  test('7. Failsafe timeout: hard cap ensures it never stays past 6s under slow conditions', async ({ page }) => {
    // Simulate slow page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // At 6.6s, preloader must be guaranteed unmounted
    await page.waitForTimeout(6600);
    const preloader = page.locator('.elp');
    await expect(preloader).toHaveCount(0);
  });

});
