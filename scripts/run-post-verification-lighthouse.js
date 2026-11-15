const http = require('http');
const fs = require('fs');
const chromeLauncher = require('chrome-launcher');

function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          setTimeout(check, 500);
        }
      }).on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server at ${url} not responding within ${timeoutMs}ms`));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

async function runLighthousePass(chrome, isMobile = true) {
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
    a11y: Math.round((lhr.categories.accessibility?.score || 0) * 100),
    bp: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
    seo: Math.round((lhr.categories.seo?.score || 0) * 100),
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
  return sorted[mid][key];
}

async function main() {
  console.log('Connecting to existing server at http://127.0.0.1:3000/ ...');
  await waitForServer('http://127.0.0.1:3000/');
  console.log('Server verified ready.');

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  console.log('Chrome launched on port:', chrome.port);

  try {
    const mobileRuns = [];
    console.log('\n--- RUNNING 3 MOBILE LIGHTHOUSE PASSES ---');
    for (let i = 0; i < 3; i++) {
      console.log(`  Mobile run ${i + 1}/3...`);
      const r = await runLighthousePass(chrome, true);
      console.log(`    Run ${i + 1}: Perf=${r.perf}, A11y=${r.a11y}, BP=${r.bp}, SEO=${r.seo}, LCP=${r.lcpDisplay} (${r.lcp}ms), TBT=${r.tbt}ms, CLS=${r.cls}`);
      mobileRuns.push(r);
    }

    const desktopRuns = [];
    console.log('\n--- RUNNING 3 DESKTOP LIGHTHOUSE PASSES ---');
    for (let i = 0; i < 3; i++) {
      console.log(`  Desktop run ${i + 1}/3...`);
      const r = await runLighthousePass(chrome, false);
      console.log(`    Run ${i + 1}: Perf=${r.perf}, A11y=${r.a11y}, BP=${r.bp}, SEO=${r.seo}, LCP=${r.lcpDisplay} (${r.lcp}ms), TBT=${r.tbt}ms, CLS=${r.cls}`);
      desktopRuns.push(r);
    }

    const mobileMedian = {
      perf: getMedian(mobileRuns, 'perf'),
      a11y: getMedian(mobileRuns, 'a11y'),
      bp: getMedian(mobileRuns, 'bp'),
      seo: getMedian(mobileRuns, 'seo'),
      fcp: getMedian(mobileRuns, 'fcp'),
      lcp: getMedian(mobileRuns, 'lcp'),
      tbt: getMedian(mobileRuns, 'tbt'),
      cls: getMedian(mobileRuns, 'cls'),
    };

    const desktopMedian = {
      perf: getMedian(desktopRuns, 'perf'),
      a11y: getMedian(desktopRuns, 'a11y'),
      bp: getMedian(desktopRuns, 'bp'),
      seo: getMedian(desktopRuns, 'seo'),
      fcp: getMedian(desktopRuns, 'fcp'),
      lcp: getMedian(desktopRuns, 'lcp'),
      tbt: getMedian(desktopRuns, 'tbt'),
      cls: getMedian(desktopRuns, 'cls'),
    };

    const report = {
      mobileMedian,
      desktopMedian,
      mobileRuns,
      desktopRuns,
    };

    if (!fs.existsSync('qa/reports')) {
      fs.mkdirSync('qa/reports', { recursive: true });
    }
    fs.writeFileSync('qa/reports/post-remediation-lighthouse.json', JSON.stringify(report, null, 2));

    console.log('\n==========================================');
    console.log('POST-REMEDIATION LIGHTHOUSE RESULTS');
    console.log('==========================================');
    console.log('MOBILE MEDIAN :');
    console.log(JSON.stringify(mobileMedian, null, 2));
    console.log('\nDESKTOP MEDIAN:');
    console.log(JSON.stringify(desktopMedian, null, 2));
    console.log('==========================================\n');

  } finally {
    await chrome.kill();
  }
}

main().catch((err) => {
  console.error('Fatal in post verification:', err);
  process.exit(1);
});

