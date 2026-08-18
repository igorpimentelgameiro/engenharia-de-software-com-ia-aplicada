const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 5_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: 'https://erickwendel.github.io/vanilla-js-web-app-example/',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
