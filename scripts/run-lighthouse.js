const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const routes = ['/', '/vehicles', '/services', '/contact', '/quote'];

function extractAuditDetails(lhr) {
  const perfAudits = lhr.audits;
  const lcp = perfAudits['largest-contentful-paint'] ? {
    displayValue: perfAudits['largest-contentful-paint'].displayValue,
    numericValue: Math.round(perfAudits['largest-contentful-paint'].numericValue || 0),
  } : null;

  const cls = perfAudits['cumulative-layout-shift'] ? {
    displayValue: perfAudits['cumulative-layout-shift'].displayValue,
    numericValue: Number((perfAudits['cumulative-layout-shift'].numericValue || 0).toFixed(4)),
  } : null;

  const tbt = perfAudits['total-blocking-time'] ? {
    displayValue: perfAudits['total-blocking-time'].displayValue,
    numericValue: Math.round(perfAudits['total-blocking-time'].numericValue || 0),
  } : null;

  const fcp = perfAudits['first-contentful-paint'] ? {
    displayValue: perfAudits['first-contentful-paint'].displayValue,
    numericValue: Math.round(perfAudits['first-contentful-paint'].numericValue || 0),
  } : null;

  // Extract top 5 opportunities/diagnostics
  const opportunities = [];
  for (const [id, audit] of Object.entries(perfAudits)) {
    if (audit.details && audit.details.type === 'opportunity' && (audit.details.overallSavingsMs > 0 || audit.details.overallSavingsBytes > 0)) {
      opportunities.push({
        id,
        title: audit.title,
        savingsMs: audit.details.overallSavingsMs || 0,
        savingsBytes: audit.details.overallSavingsBytes || 0,
        displayValue: audit.displayValue || '',
      });
    }
  }
  opportunities.sort((a, b) => (b.savingsMs - a.savingsMs) || (b.savingsBytes - a.savingsBytes));

  // Extract failing accessibility audits
  const failingA11y = [];
  if (lhr.categories.accessibility) {
    for (const ref of lhr.categories.accessibility.auditRefs) {
      const audit = perfAudits[ref.id];
      if (audit && audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'notApplicable' && audit.scoreDisplayMode !== 'informative') {
        failingA11y.push({
          id: ref.id,
          title: audit.title,
          score: audit.score,
          description: audit.description,
          details: audit.details ? {
            type: audit.details.type,
            itemCount: audit.details.items ? audit.details.items.length : 0,
            items: audit.details.items ? audit.details.items.slice(0, 3).map(it => ({
              snippet: it.node ? it.node.snippet : (it.snippet || ''),
              explanation: it.node ? it.node.explanation : (it.explanation || ''),
            })) : []
          } : null,
        });
      }
    }
  }

  return {
    lcp,
    cls,
    tbt,
    fcp,
    topOpportunities: opportunities.slice(0, 5),
    failingA11y,
  };
}

async function runAudit() {
  const { default: lighthouse } = await import('lighthouse');

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  const results = [];

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    console.log(`\nAuditing ${route} (Mobile)...`);

    const mobileReport = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 375, height: 667, deviceScaleFactor: 2 },
        throttlingMethod: 'simulate',
      }
    });

    const mScores = {
      perf: Math.round(mobileReport.lhr.categories.performance.score * 100),
      a11y: Math.round(mobileReport.lhr.categories.accessibility.score * 100),
      bp: Math.round(mobileReport.lhr.categories['best-practices'].score * 100),
      seo: Math.round(mobileReport.lhr.categories.seo.score * 100),
    };
    const mDetails = extractAuditDetails(mobileReport.lhr);

    console.log(`Auditing ${route} (Desktop)...`);
    const desktopReport = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1 },
        throttlingMethod: 'simulate',
      }
    });

    const dScores = {
      perf: Math.round(desktopReport.lhr.categories.performance.score * 100),
      a11y: Math.round(desktopReport.lhr.categories.accessibility.score * 100),
      bp: Math.round(desktopReport.lhr.categories['best-practices'].score * 100),
      seo: Math.round(desktopReport.lhr.categories.seo.score * 100),
    };
    const dDetails = extractAuditDetails(desktopReport.lhr);

    results.push({
      route,
      mobile: { ...mScores, ...mDetails },
      desktop: { ...dScores, ...dDetails },
    });

    console.log(`Route ${route}:`);
    console.log(`  Mobile : Perf ${mScores.perf} | A11y ${mScores.a11y} | BP ${mScores.bp} | SEO ${mScores.seo} | LCP: ${mDetails.lcp?.displayValue} | CLS: ${mDetails.cls?.displayValue} | TBT: ${mDetails.tbt?.displayValue}`);
    console.log(`  Desktop: Perf ${dScores.perf} | A11y ${dScores.a11y} | BP ${dScores.bp} | SEO ${dScores.seo} | LCP: ${dDetails.lcp?.displayValue} | CLS: ${dDetails.cls?.displayValue} | TBT: ${dDetails.tbt?.displayValue}`);
  }

  await chrome.kill();

  fs.writeFileSync('qa/reports/lighthouse-raw.json', JSON.stringify(results, null, 2));
  console.log('\nSaved full report with metrics & a11y to qa/reports/lighthouse-raw.json');
}

runAudit().catch(err => {
  console.error('Lighthouse error:', err);
  process.exit(1);
});
