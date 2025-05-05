// playwright.config.js
module.exports = {
    testDir: './tests',
    timeout: 10000,
    retries: 0,
    use: {
      headless: true,
      baseURL: 'http://localhost:5173',
    },
  };
  