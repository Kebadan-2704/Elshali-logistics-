const { chromium } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');
const path = require('path');

const routes = [
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
  '/services',
  '/terms',
  '/vehicles',
  '/why-choose-us',
];

async function runAxeAll() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const report = {};
  let totalViolations = 0;

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      // wait extra 500ms for animations/hydration
      await page.waitForTimeout(500);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const violations = results.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodesCount: v.nodes.length,
        nodes: v.nodes.slice(0, 5).map(n => ({
          html: n.html,
          target: n.target,
          failureSummary: n.failureSummary,
        })),
      }));

      report[route] = {
        total: violations.length,
        violations,
      };

      totalViolations += violations.length;
      console.log(`Route ${route}: ${violations.length} violations`);
    } catch (err) {
      console.error(`Error auditing ${route}:`, err.message);
      report[route] = { error: err.message };
    }
  }

  await browser.close();

  const outPath = path.join(process.cwd(), 'qa', 'reports', 'axe-all-routes.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ totalViolations, routes: report }, null, 2));

  console.log(`\nAxe audit complete! Total violations across all 17 routes: ${totalViolations}`);
}

runAxeAll().catch(err => {
  console.error('Axe script failed:', err);
  process.exit(1);
});

