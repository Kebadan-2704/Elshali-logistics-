const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runDiagnosis() {
  const { default: lighthouse } = await import('lighthouse');

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  try {
    console.log('Running mobile Lighthouse pass with full diagnostic capture...');
    const resMobile = await lighthouse('http://127.0.0.1:3000/', {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 375, height: 667, deviceScaleFactor: 2 },
        throttlingMethod: 'simulate',
      },
    });

    const lhrM = resMobile.lhr;
    fs.writeFileSync('qa/reports/lcp-diagnostic-mobile-raw.json', JSON.stringify(lhrM, null, 2));

    console.log('Running desktop Lighthouse pass with full diagnostic capture...');
    const resDesktop = await lighthouse('http://127.0.0.1:3000/', {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1 },
        throttlingMethod: 'simulate',
      },
    });

    const lhrD = resDesktop.lhr;
    fs.writeFileSync('qa/reports/lcp-diagnostic-desktop-raw.json', JSON.stringify(lhrD, null, 2));

    console.log('Saved raw reports.');
  } finally {
    await chrome.kill();
  }
}

runDiagnosis().catch(console.error);

