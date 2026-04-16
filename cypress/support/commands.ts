/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      setAuthTokens(): Chainable<void>;
      clearAuthTokens(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('setAuthTokens', () => {
  localStorage.setItem('refreshToken', 'test_refresh_token_12345');
  cy.setCookie('accessToken', 'Bearer test_access_token_12345');
});

Cypress.Commands.add('clearAuthTokens', () => {
  localStorage.removeItem('refreshToken');
  cy.clearCookie('accessToken');
});

export {};
