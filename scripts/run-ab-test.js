const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

const testName = process.argv[2] || 'test';

async function runLighthousePass(chrome, isMobile) {
  const { default: lighthouse } = await import('lighthouse');
  const res = await lighthouse('http://127.0.0.1:3000/', {
    port: chrome.port,
    logLevel: 'error',
    output: 'json',
  }, {
    extends: 'lighthouse:default',
    settings: {
      formFactor: isMobile ? 'mobile' : 'desktop',
      screenEmulation: isMobile
        ? { mobile: true, width: 375, height: 667, deviceScaleFactor: 2 }
        : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1 },
      throttlingMethod: 'simulate',
    },
  });

  const lhr = res.lhr;
  return {
    perf: Math.round((lhr.categories.performance?.score || 0) * 100),
    fcp: Math.round(lhr.audits['first-contentful-paint']?.numericValue || 0),
    lcp: Math.round(lhr.audits['largest-contentful-paint']?.numericValue || 0),
    tbt: Math.round(lhr.audits['total-blocking-time']?.numericValue || 0),
    cls: Number((lhr.audits['cumulative-layout-shift']?.numericValue || 0).toFixed(4)),
    lcpDisplay: lhr.audits['largest-contentful-paint']?.displayValue || '',
  };
}

function getMedian(runs, key) {
  const sorted = [...runs].sort((a, b) => a[key] - b[key]);
  const mid = Math.floor(sorted.length / 2);
  return sorted[mid];
}

async function main() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  try {
    console.log(`[${testName}] Running 3 mobile passes...`);
    const mobileRuns = [];
    for (let i = 0; i < 3; i++) {
      const r = await runLighthousePass(chrome, true);
      console.log(`  M${i + 1}: Perf=${r.perf}, LCP=${r.lcpDisplay} (${r.lcp}ms), FCP=${r.fcp}ms, TBT=${r.tbt}ms`);
      mobileRuns.push(r);
    }

    console.log(`[${testName}] Running 3 desktop passes...`);
    const desktopRuns = [];
    for (let i = 0; i < 3; i++) {
      const r = await runLighthousePass(chrome, false);
      console.log(`  D${i + 1}: Perf=${r.perf}, LCP=${r.lcpDisplay} (${r.lcp}ms), FCP=${r.fcp}ms, TBT=${r.tbt}ms`);
      desktopRuns.push(r);
    }

    const medM = getMedian(mobileRuns, 'lcp');
    const medD = getMedian(desktopRuns, 'lcp');

    const out = {
      testName,
      mobileMedian: medM,
      desktopMedian: medD,
      mobileRuns,
      desktopRuns,
    };

    if (!fs.existsSync('qa/reports/ab-tests')) {
      fs.mkdirSync('qa/reports/ab-tests', { recursive: true });
    }
    fs.writeFileSync(`qa/reports/ab-tests/${testName}.json`, JSON.stringify(out, null, 2));

    console.log(`\n=== RESULTS FOR [${testName}] ===`);
    console.log(`Mobile Median : Perf=${medM.perf}, LCP=${medM.lcp}ms (${medM.lcpDisplay}), FCP=${medM.fcp}ms, TBT=${medM.tbt}ms`);
    console.log(`Desktop Median: Perf=${medD.perf}, LCP=${medD.lcp}ms (${medD.lcpDisplay}), FCP=${medD.fcp}ms, TBT=${medD.tbt}ms`);
  } finally {
    await chrome.kill();
  }
}

main().catch(console.error);

