import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './qa',
  timeout: 30000,
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
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
