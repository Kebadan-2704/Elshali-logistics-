const { execSync } = require('child_process');
const fs = require('fs');

function runLighthouse(preset, runIndex) {
  const outputPath = `qa/reports/lh-${preset}-${runIndex}.json`;
  const flags = preset === 'desktop' ? '--preset=desktop' : '';
  const cmd = `npx lighthouse http://localhost:3000 --output=json --output-path=${outputPath} --chrome-flags="--headless" ${flags} --quiet`;
  console.log(`Running Lighthouse ${preset} (run ${runIndex}/3)...`);
  execSync(cmd, { stdio: 'ignore' });
  const data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  return {
    perf: Math.round(data.categories.performance.score * 100),
    a11y: Math.round(data.categories.accessibility.score * 100),
    bp: Math.round(data.categories['best-practices'].score * 100),
    seo: Math.round(data.categories.seo.score * 100),
    FCP: data.audits['first-contentful-paint'].displayValue,
    LCP: data.audits['largest-contentful-paint'].displayValue,
    LCP_ms: data.audits['largest-contentful-paint'].numericValue,
    TBT: data.audits['total-blocking-time'].displayValue,
    TBT_ms: data.audits['total-blocking-time'].numericValue,
    CLS: data.audits['cumulative-layout-shift'].displayValue,
    SpeedIndex: data.audits['speed-index'].displayValue,
  };
}

function medianOf3(arr, key) {
  const sorted = [...arr].sort((a, b) => a[key] - b[key]);
  return sorted[1];
}

async function main() {
  console.log('--- STARTING LIGHTHOUSE MEDIAN OF 3 AUDIT ---');

  // Desktop runs
  const desktopRuns = [
    runLighthouse('desktop', 1),
    runLighthouse('desktop', 2),
    runLighthouse('desktop', 3),
  ];
  const desktopMedian = medianOf3(desktopRuns, 'perf');
  console.log('Desktop Runs:', desktopRuns.map(r => r.perf));
  console.log('Desktop Median Result:', desktopMedian);

  // Mobile runs
  const mobileRuns = [
    runLighthouse('mobile', 1),
    runLighthouse('mobile', 2),
    runLighthouse('mobile', 3),
  ];
  const mobileMedian = medianOf3(mobileRuns, 'perf');
  console.log('Mobile Runs:', mobileRuns.map(r => r.perf));
  console.log('Mobile Median Result:', mobileMedian);

  const summary = {
    desktop: {
      median: desktopMedian,
      runs: desktopRuns,
    },
    mobile: {
      median: mobileMedian,
      runs: mobileRuns,
    },
  };

  fs.writeFileSync('qa/reports/lighthouse-summary.json', JSON.stringify(summary, null, 2));
  console.log('Saved qa/reports/lighthouse-summary.json');
}

main().catch(err => {
  console.error('Lighthouse audit error:', err);
  process.exit(1);
});
