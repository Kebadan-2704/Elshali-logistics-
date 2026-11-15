const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function dumpLcp() {
  const { default: lighthouse } = await import('lighthouse');

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  const res = await lighthouse('http://localhost:3000/', {
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

  fs.writeFileSync('qa/reports/mobile-homepage-lhr.json', JSON.stringify({
    lcp: res.lhr.audits['largest-contentful-paint'],
    lcpElement: res.lhr.audits['largest-contentful-paint-element'],
    cls: res.lhr.audits['cumulative-layout-shift'],
    clsElements: res.lhr.audits['layout-shift-elements'],
    metrics: res.lhr.audits['metrics'],
    screenshotThumbnails: res.lhr.audits['screenshot-thumbnails'],
  }, null, 2));

  console.log('Saved lcp details to qa/reports/mobile-homepage-lhr.json');
  await chrome.kill();
}

dumpLcp().catch(console.error);

