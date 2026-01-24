const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30000,

  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  reporter: [
    ['list'],

    ['playwright-smart-reporter', {
      outputFile: 'smart-report/report.html',
      autoOpen: true,
    }],
  ],
});
