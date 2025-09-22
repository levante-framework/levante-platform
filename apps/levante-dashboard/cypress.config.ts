import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    baseUrl: process.env.CI ? 'http://localhost:5173/' : 'https://localhost:5173/',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    excludeSpecPattern: ['**/locales*.cy.ts'],
    env: {
      E2E_BASE_URL: process.env.E2E_BASE_URL || 'http://localhost:5173/signin',
      E2E_TEST_EMAIL: process.env.E2E_TEST_EMAIL,
      E2E_TEST_PASSWORD: process.env.E2E_TEST_PASSWORD,
      E2E_SKIP_LOGIN: process.env.E2E_SKIP_LOGIN,
      E2E_LOCALES: process.env.E2E_LOCALES,
      dashboardUrl: 'https://localhost:5173',
      firebaseEmulatorUrl: 'http://127.0.0.1:4001/',
      waitForServers: true
    },
  },
});
