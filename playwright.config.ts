import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './qa',
  timeout: 60000,
  fullyParallel: false,
  reporter: [['list'], ['json', { outputFile: 'qa/reports/playwright-results.json' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx next start -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
