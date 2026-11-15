const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

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
  const lcpInsight = lhr.audits['lcp-breakdown-insight'];
  const lcpElement = lcpInsight?.details?.items?.find(it => it.type === 'node') || null;
  const subpartsTable = lcpInsight?.details?.items?.find(it => it.type === 'table')?.items || [];
  
  const network = (lhr.audits['network-requests']?.details?.items || [])
    .filter(req => req.rendererStartTime <= 3000)
    .map(req => ({
      url: req.url.replace('http://127.0.0.1:3000', ''),
      startTime: Math.round(req.rendererStartTime),
      duration: Math.round(req.networkEndTime - req.rendererStartTime),
      transferSize: req.transferSize,
      resourceType: req.resourceType,
      mimeType: req.mimeType,
    }));

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
    lcpElement: lcpElement ? {
      selector: lcpElement.selector,
      snippet: lcpElement.snippet,
      nodeLabel: lcpElement.nodeLabel,
    } : null,
    subparts: subpartsTable,
    waterfallFirst3s: network,
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
    console.log('Running 3 mobile passes...');
    const mobileRuns = [];
    for (let i = 0; i < 3; i++) {
      console.log(`  Mobile pass ${i + 1}...`);
      const r = await runLighthousePass(chrome, true);
      console.log(`    Pass ${i + 1}: Perf=${r.perf}, LCP=${r.lcpDisplay} (${r.lcp}ms), FCP=${r.fcp}ms, TBT=${r.tbt}ms, CLS=${r.cls}`);
      mobileRuns.push(r);
    }

    console.log('Running 3 desktop passes...');
    const desktopRuns = [];
    for (let i = 0; i < 3; i++) {
      console.log(`  Desktop pass ${i + 1}...`);
      const r = await runLighthousePass(chrome, false);
      console.log(`    Pass ${i + 1}: Perf=${r.perf}, LCP=${r.lcpDisplay} (${r.lcp}ms), FCP=${r.fcp}ms, TBT=${r.tbt}ms, CLS=${r.cls}`);
      desktopRuns.push(r);
    }

    const medianMobile = getMedian(mobileRuns, 'lcp');
    const medianDesktop = getMedian(desktopRuns, 'lcp');

    const result = {
      mobileRuns,
      desktopRuns,
      medianMobile,
      medianDesktop,
    };

    fs.writeFileSync('qa/reports/step1-production-lcp.json', JSON.stringify(result, null, 2));
    console.log('\nSTEP 1 AUDIT COMPLETE. Saved to qa/reports/step1-production-lcp.json');
    console.log('Median Mobile LCP:', medianMobile.lcp, 'ms, Perf:', medianMobile.perf);
    console.log('Median Desktop LCP:', medianDesktop.lcp, 'ms, Perf:', medianDesktop.perf);
  } finally {
    await chrome.kill();
  }
}

main().catch(console.error);

