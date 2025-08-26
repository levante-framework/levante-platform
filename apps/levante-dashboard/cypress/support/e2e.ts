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
  // Verificar se o dashboard está rodando
  cy.request({
    url: 'https://localhost:5173',
    failOnStatusCode: false,
    timeout: 30000
  }).then((response) => {
    // Se conseguir conectar, o dashboard está rodando
    cy.log('Dashboard server is running');
  });

  // Verificar se o Firebase Emulator está rodando
  cy.request({
    url: 'http://127.0.0.1:4001/',
    failOnStatusCode: false,
    timeout: 30000
  }).then((response) => {
    // Se conseguir conectar, o emulator está rodando
    cy.log('Firebase Emulator is running');
  });
});
