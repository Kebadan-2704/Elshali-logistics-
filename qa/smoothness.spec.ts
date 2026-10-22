import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Measure animation, frame times, long tasks and CLS', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const metrics = await page.evaluate(async () => {
    const frames: number[] = [];
    let last = performance.now();
    let isRunning = true;
    const longTasks: { duration: number; startTime: number }[] = [];
    let clsValue = 0;

    // Monitor long tasks
    try {
      const longObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          longTasks.push({ duration: entry.duration, startTime: entry.startTime });
        });
      });
      longObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Not supported in all headless configs
    }

    // Monitor CLS
    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}

    // Track frame times
    const tick = (time: number) => {
      const delta = time - last;
      frames.push(delta);
      last = time;
      if (isRunning) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Perform scripted 10-second scroll
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    const duration = 10000;
    const start = performance.now();

    while (performance.now() - start < duration) {
      const elapsed = performance.now() - start;
      const progress = elapsed / duration;
      window.scrollTo(0, progress * totalScroll);
      await new Promise((r) => requestAnimationFrame(r));
    }

    isRunning = false;
    await new Promise((r) => setTimeout(r, 200));

    // Calculate percentiles
    const sorted = [...frames].sort((a, b) => a - b);
    const q = (p: number) => sorted[Math.floor(sorted.length * p)] || 0;
    const framesOver50ms = sorted.filter((d) => d > 50).length;

    return {
      frameCount: frames.length,
      p50: Number(q(0.5).toFixed(2)),
      p95: Number(q(0.95).toFixed(2)),
      p99: Number(q(0.99).toFixed(2)),
      worst: Number((sorted[sorted.length - 1] || 0).toFixed(2)),
      framesOver50ms,
      longTaskCount: longTasks.length,
      longTasks,
      clsValue: Number(clsValue.toFixed(4)),
    };
  });

  const reportsDir = path.join(process.cwd(), 'qa', 'reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDir, 'smoothness-metrics.json'),
    JSON.stringify(metrics, null, 2)
  );

  console.log('Smoothness Metrics:', metrics);
  expect(metrics.p95, 'p95 frame time <= 25ms').toBeLessThanOrEqual(25);
  expect(metrics.clsValue, 'CLS <= 0.05').toBeLessThanOrEqual(0.05);
});
