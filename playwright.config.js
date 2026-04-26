const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 150 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',

  globalSetup: './global-setup.js',

  use: {
    headless: false,
    slowMo: 500,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1440, height: 900 },
    // Auto load saved session for every test
    storageState: './auth/session.json',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});