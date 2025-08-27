import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'djwni9',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Use HTTPS locally, HTTP in CI
    baseUrl: process.env.CI ? 'http://localhost:5173/' : 'https://localhost:5173/',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Aguardar mais tempo para os servidores iniciarem
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    // Configurações para desenvolvimento local
    env: {
      // URLs dos servidores
      dashboardUrl: 'https://localhost:5173',
      firebaseEmulatorUrl: 'http://127.0.0.1:4001/',
      // Aguardar servidores estarem prontos
      waitForServers: true
    }
  },
});
