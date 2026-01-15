// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Aguardar servidores estarem prontos antes de executar testes
beforeEach(() => {
  // Verificar se o dashboard está rodando (usa baseUrl do Cypress se disponível)
  const baseUrl = (Cypress.config('baseUrl') as string) || 'https://localhost:5173';
  cy.request({ url: baseUrl, failOnStatusCode: false, timeout: 30000 }).then(() => {
    cy.log('Dashboard server is running');
  });

  // Verificar se o Firebase Emulator está rodando (apenas quando explicitamente requisitado)
  if (Cypress.env('E2E_REQUIRE_EMULATOR')) {
    cy.request({ url: 'http://127.0.0.1:4001/', failOnStatusCode: false, timeout: 30000 }).then(() => {
      cy.log('Firebase Emulator is running');
    });
  }
});
