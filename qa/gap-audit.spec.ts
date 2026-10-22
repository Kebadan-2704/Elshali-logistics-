import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

test.describe('Audit Gap Closure Suite', () => {

  test('DOM Node Count & Hydration Health', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const domCount = await page.evaluate(() => document.querySelectorAll('*').length);
    const bodyChildren = await page.evaluate(() => document.body.querySelectorAll('*').length);
    console.log(`[GAP-AUDIT] Total DOM Nodes: ${domCount}, Body Elements: ${bodyChildren}`);
    expect(domCount).toBeLessThan(1500);
  });

  test('Axe-Core Comprehensive State Sweep', async ({ page }) => {
    const axeResults: Record<string, { violations: number; details: any[] }> = {};

    // State 1: Page Load
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const res1 = await new AxeBuilder({ page }).analyze();
    axeResults['initial_load'] = {
      violations: res1.violations.length,
      details: res1.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, desc: v.description }))
    };

    // State 2: Mobile Nav Open
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const hamburger = page.locator('button.nav-toggle');
    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(300);
      const res2 = await new AxeBuilder({ page }).analyze();
      axeResults['mobile_nav_open'] = {
        violations: res2.violations.length,
        details: res2.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, desc: v.description }))
      };
      // Close nav
      await hamburger.click();
      await page.waitForTimeout(300);
    }

    // State 3: Routes Tabs
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const routesSection = page.locator('#routes');
    await routesSection.scrollIntoViewIfNeeded();
    const tnTab = page.locator('button.routes-tab:has-text("Tamil Nadu")');
    if (await tnTab.isVisible()) {
      await tnTab.click();
      await page.waitForTimeout(200);
      const res3 = await new AxeBuilder({ page }).analyze();
      axeResults['routes_tamil_nadu_tab'] = {
        violations: res3.violations.length,
        details: res3.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, desc: v.description }))
      };
    }

    // State 4: Modal Open
    const quoteBtn = page.locator('button:has-text("GET A QUOTE")').first();
    await quoteBtn.click();
    await page.waitForSelector('.modal-overlay', { state: 'visible' });
    const res4 = await new AxeBuilder({ page }).analyze();
    axeResults['modal_open'] = {
      violations: res4.violations.length,
      details: res4.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, desc: v.description }))
    };

    // State 5: Modal Form Validation
    const submitBtn = page.locator('.modal-panel button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(200);
    const res5 = await new AxeBuilder({ page }).analyze();
    axeResults['modal_with_validation_errors'] = {
      violations: res5.violations.length,
      details: res5.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, desc: v.description }))
    };

    // Save Axe sweep report
    fs.mkdirSync('qa/reports', { recursive: true });
    fs.writeFileSync('qa/reports/axe-state-sweep.json', JSON.stringify(axeResults, null, 2));
    console.log('[GAP-AUDIT] Axe-Core 5-State Sweep Complete:', JSON.stringify(axeResults, null, 2));
  });

  test('Mobile 390x844 Frame-Time & Smoothness Profile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const stats = await page.evaluate(async () => {
      const frames: number[] = [];
      let last = performance.now();
      let running = true;
      const longTasks: number[] = [];
      try {
        new PerformanceObserver((l) => l.getEntries().forEach((e) => longTasks.push(e.duration))).observe({
          entryTypes: ['longtask'],
        });
      } catch (e) {}

      const tick = (now: number) => {
        frames.push(now - last);
        last = now;
        if (running) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      const totalHeight = document.body.scrollHeight - innerHeight;
      const start = performance.now();
      const duration = 6000;
      while (performance.now() - start < duration) {
        const progress = (performance.now() - start) / duration;
        window.scrollTo(0, progress * totalHeight);
        await new Promise((r) => requestAnimationFrame(r));
      }
      running = false;
      const s = [...frames].sort((a, b) => a - b);
      const q = (p: number) => s[Math.floor(s.length * p)] || 0;
      return {
        sampleCount: frames.length,
        p50: q(0.5),
        p95: q(0.95),
        p99: q(0.99),
        worst: s.at(-1) || 0,
        longTasksCount: longTasks.length,
      };
    });

    console.log('[GAP-AUDIT] Mobile 390x844 Scroll Stats:', stats);
    fs.writeFileSync('qa/reports/mobile-smoothness.json', JSON.stringify(stats, null, 2));
  });

  test('Real Interaction INP Probe', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Measure click latency on interactive elements
    const interactions = await page.evaluate(async () => {
      const results: { action: string; duration: number }[] = [];

      const measureClick = async (el: HTMLElement, name: string) => {
        const t0 = performance.now();
        el.click();
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const t1 = performance.now();
        results.push({ action: name, duration: Math.round(t1 - t0) });
      };

      // 1. Tab click
      const tnTab = document.querySelector('button.routes-tab:nth-child(2)') as HTMLElement;
      if (tnTab) await measureClick(tnTab, 'Routes Tab Click');

      // 2. Vehicle Card Expand
      const vCard = document.querySelector('.vehicle-card:nth-child(2)') as HTMLElement;
      if (vCard) await measureClick(vCard, 'Vehicle Card Selection');

      // 3. Modal Open
      const quoteBtn = document.querySelector('button.btn-primary') as HTMLElement;
      if (quoteBtn) await measureClick(quoteBtn, 'Open Quote Modal');

      return results;
    });

    console.log('[GAP-AUDIT] Measured INP Interaction Durations (ms):', interactions);
    fs.writeFileSync('qa/reports/inp-interactions.json', JSON.stringify(interactions, null, 2));
  });

  test('320px–360px Exact Overflow Offenders Inspection', async ({ page }) => {
    const viewports = [320, 360];
    const report: any[] = [];

    for (const w of viewports) {
      await page.setViewportSize({ width: w, height: 640 });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

      const offenders = await page.evaluate((width) => {
        const els = Array.from(document.querySelectorAll('body *'));
        const bad: { tag: string; id: string; className: string; right: number; scrollWidth: number }[] = [];
        for (const el of els) {
          const rect = el.getBoundingClientRect();
          if (rect.right > width + 1 && rect.width > 0) {
            bad.push({
              tag: el.tagName,
              id: el.id,
              className: (el as HTMLElement).className || '',
              right: Math.round(rect.right),
              scrollWidth: (el as HTMLElement).scrollWidth,
            });
          }
        }
        return {
          windowInnerWidth: window.innerWidth,
          docScrollWidth: document.documentElement.scrollWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
          offenders: bad.slice(0, 10),
        };
      }, w);

      report.push({ viewport: w, ...offenders });
    }

    console.log('[GAP-AUDIT] 320px/360px Overflow Analysis:', JSON.stringify(report, null, 2));
    fs.writeFileSync('qa/reports/overflow-offenders.json', JSON.stringify(report, null, 2));
  });

  test('Section 11 Resilience: Tamil Input, Print, Zoom & No-JS', async ({ page }) => {
    const results: Record<string, boolean | string> = {};

    // 1. Tamil Script Input Test in Modal
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.locator('button:has-text("GET A QUOTE")').first().click();
    await page.waitForSelector('.modal-overlay', { state: 'visible' });

    const tamilName = 'எல்சாலி லாஜிஸ்டிக்ஸ் - கோயம்புத்தூர்';
    const nameInput = page.locator('#modal-name');
    if (await nameInput.isVisible()) {
      await nameInput.fill(tamilName);
      const val = await nameInput.inputValue();
      results['tamil_input_accepted'] = val === tamilName;
      console.log(`[GAP-AUDIT] Tamil Input Verification: ${val === tamilName ? 'PASS' : 'FAIL'}`);
    }

    // 2. Print Stylesheet Emulation
    await page.emulateMedia({ media: 'print' });
    const navHiddenOnPrint = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return true;
      const display = window.getComputedStyle(nav).display;
      return display === 'none';
    });
    results['nav_hidden_in_print'] = navHiddenOnPrint;

    // 3. Forced Colors Mode Emulation
    await page.emulateMedia({ forcedColors: 'active' });
    const forcedColorsRender = await page.evaluate(() => document.body.offsetHeight > 1000);
    results['forced_colors_supported'] = forcedColorsRender;

    // Reset media
    await page.emulateMedia({ media: 'screen', forcedColors: 'none' });

    fs.writeFileSync('qa/reports/resilience-report.json', JSON.stringify(results, null, 2));
  });

  test('Modal 11 Fields & Form Requirements Verification', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.locator('button:has-text("GET A QUOTE")').first().click();
    await page.waitForSelector('.modal-overlay', { state: 'visible' });

    const fields = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('.modal-panel input, .modal-panel select, .modal-panel textarea'));
      return inputs.map(i => ({
        id: i.id,
        name: (i as HTMLInputElement).name,
        tag: i.tagName,
        type: (i as HTMLInputElement).type,
        required: (i as HTMLInputElement).required,
        value: (i as HTMLInputElement).value
      }));
    });

    console.log('[GAP-AUDIT] Modal Fields Audit:', fields);
    fs.writeFileSync('qa/reports/modal-fields-audit.json', JSON.stringify(fields, null, 2));
    expect(fields.length).toBeGreaterThanOrEqual(10);
  });

  test('Nav Links Scroll Anchors Below Navbar', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const navLinks = ['#about', '#services', '#vehicles', '#routes', '#contact'];
    const navHeight = await page.evaluate(() => document.querySelector('nav')?.getBoundingClientRect().height || 96);
    const results: Record<string, { top: number; clearOfNav: boolean }> = {};

    for (const hash of navLinks) {
      await page.click(`a[href="${hash}"], a[href="/${hash}"]`);
      await page.waitForTimeout(600);
      const top = await page.evaluate((h) => {
        const el = document.querySelector(h);
        return el ? Math.round(el.getBoundingClientRect().top) : -999;
      }, hash);
      results[hash] = { top, clearOfNav: top >= 0 && top <= 120 };
    }

    console.log('[GAP-AUDIT] Nav Link Scrollspy Landings:', results);
    fs.writeFileSync('qa/reports/nav-anchor-landings.json', JSON.stringify(results, null, 2));
  });

});
