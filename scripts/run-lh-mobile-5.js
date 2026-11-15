const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runOnce() {
  const { default: lighthouse } = await import('lighthouse');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  try {
    const res = await lighthouse('http://localhost:3000/', {
      port: chrome.port,
      logLevel: 'error',
      output: 'json',
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
        },
        throttlingMethod: 'simulate',
      },
    });

    const lhr = res.lhr;
    const perfScore = Math.round((lhr.categories.performance?.score || 0) * 100);
    const a11yScore = Math.round((lhr.categories.accessibility?.score || 0) * 100);
    const bpScore = Math.round((lhr.categories['best-practices']?.score || 0) * 100);
    const seoScore = Math.round((lhr.categories.seo?.score || 0) * 100);

    const fcp = lhr.audits['first-contentful-paint']?.numericValue || 0;
    const lcp = lhr.audits['largest-contentful-paint']?.numericValue || 0;
    const tbt = lhr.audits['total-blocking-time']?.numericValue || 0;
    const cls = lhr.audits['cumulative-layout-shift']?.numericValue || 0;
    const speedIndex = lhr.audits['speed-index']?.numericValue || 0;

    // LCP element and breakdown
    const lcpElement = lhr.audits['largest-contentful-paint-element']?.details?.items?.[0]?.node;
    const lcpBreakdown = lhr.audits['lcp-breakdown-insight']?.details?.items?.[0] || null;

    // CLS culprits
    const clsCulprits = lhr.audits['layout-shifts']?.details?.items || [];

    return {
      scores: { perfScore, a11yScore, bpScore, seoScore },
      metrics: { fcp, lcp, tbt, cls, speedIndex },
      lcpElement,
      lcpBreakdown,
      clsCulprits,
    };
  } finally {
    await chrome.kill();
  }
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function main() {
  console.log('Starting 5 mobile Lighthouse test runs on http://localhost:3000/ ...');
  const runs = [];

  for (let i = 1; i <= 5; i++) {
    console.log(`Executing Run ${i} of 5...`);
    const result = await runOnce();
    runs.push(result);
    console.log(`Run ${i} Complete: Perf=${result.scores.perfScore}, LCP=${(result.metrics.lcp / 1000).toFixed(2)}s, CLS=${result.metrics.cls.toFixed(4)}, TBT=${Math.round(result.metrics.tbt)}ms`);
  }

  const perfScores = runs.map(r => r.scores.perfScore);
  const lcpValues = runs.map(r => r.metrics.lcp);
  const clsValues = runs.map(r => r.metrics.cls);
  const tbtValues = runs.map(r => r.metrics.tbt);
  const fcpValues = runs.map(r => r.metrics.fcp);

  const summary = {
    runs: runs.map((r, idx) => ({
      run: idx + 1,
      perf: r.scores.perfScore,
      a11y: r.scores.a11yScore,
      bestPractices: r.scores.bpScore,
      seo: r.scores.seoScore,
      lcpMs: Math.round(r.metrics.lcp),
      cls: Number(r.metrics.cls.toFixed(4)),
      tbtMs: Math.round(r.metrics.tbt),
      fcpMs: Math.round(r.metrics.fcp),
    })),
    medians: {
      perf: median(perfScores),
      lcpMs: Math.round(median(lcpValues)),
      lcpSec: (median(lcpValues) / 1000).toFixed(2),
      cls: Number(median(clsValues).toFixed(4)),
      tbtMs: Math.round(median(tbtValues)),
      fcpMs: Math.round(median(fcpValues)),
    },
    diagnosticDetails: {
      lcpElement: runs[0].lcpElement,
      lcpBreakdown: runs[0].lcpBreakdown,
      clsCulpritsCount: runs[0].clsCulprits.length,
      clsCulprits: runs[0].clsCulprits,
    }
  };

  console.log('\n================ 5-RUN SUMMARY ================');
  console.log(JSON.stringify(summary, null, 2));

  fs.writeFileSync('qa/reports/lh-mobile-5runs.json', JSON.stringify(summary, null, 2), 'utf8');
}

main().catch(err => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});

