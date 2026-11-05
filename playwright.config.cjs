const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/e2e', retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:8767', trace: 'retain-on-failure' },
  webServer: { command: 'python3 -m http.server 8767 --bind 127.0.0.1', url: 'http://127.0.0.1:8767', reuseExistingServer: false },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: process.env.PW_CHANNEL || undefined } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', channel: process.env.PW_CHANNEL || undefined } }
  ]
});
