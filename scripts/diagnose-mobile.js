const chromeLauncher = require('chrome-launcher');

async function runDiagnostic() {
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

  const lhr = res.lhr;
  const lcpAudit = lhr.audits['largest-contentful-paint'];
  const lcpElementAudit = lhr.audits['largest-contentful-paint-element'];
  const clsAudit = lhr.audits['cumulative-layout-shift'];
  const clsElementsAudit = lhr.audits['layout-shift-elements'];

  console.log('--- HOMEPAGE MOBILE DIAGNOSTIC ---');
  console.log('Performance Score:', Math.round(lhr.categories.performance.score * 100));
  console.log('LCP Display:', lcpAudit ? lcpAudit.displayValue : 'N/A');
  console.log('LCP Numeric (ms):', lcpAudit ? Math.round(lcpAudit.numericValue) : 'N/A');
  
  console.log('\n--- LCP ELEMENT ---');
  if (lcpElementAudit && lcpElementAudit.details && lcpElementAudit.details.items) {
    for (const item of lcpElementAudit.details.items) {
      console.log('Node snippet:', item.node?.snippet);
      console.log('Node selector:', item.node?.selector);
      console.log('Node path:', item.node?.path);
      console.log('Node explanation:', item.node?.explanation);
    }
  } else {
    console.log('No LCP element details found.');
  }

  console.log('\n--- LCP BREAKDOWN / OPPORTUNITIES / TIMINGS ---');
  // Check metric timings if present in diagnostics
  const lcpPhases = lhr.audits['prioritize-lcp-image'] || lhr.audits['lcp-breakdown'];
  if (lcpPhases) {
    console.log('LCP Image Audit:', JSON.stringify(lcpPhases.details || {}, null, 2));
  }

  console.log('\n--- CLS SCORE & CULPRIT ELEMENTS ---');
  console.log('CLS Score:', clsAudit ? clsAudit.displayValue : 'N/A');
  console.log('CLS Numeric:', clsAudit ? clsAudit.numericValue : 'N/A');
  if (clsElementsAudit && clsElementsAudit.details && clsElementsAudit.details.items) {
    for (const item of clsElementsAudit.details.items) {
      console.log('Shift Score contribution:', item.score);
      console.log('Node snippet:', item.node?.snippet);
      console.log('Node selector:', item.node?.selector);
    }
  } else {
    console.log('No CLS shift element details found.');
  }

  await chrome.kill();
}

runDiagnostic().catch(console.error);

