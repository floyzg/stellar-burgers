/// <reference types="cypress" />

import { SELECTORS } from './selectors';
import { TEST_DATA } from './test-data';

declare global {
  namespace Cypress {
    interface Chainable {
      // Auth commands
      setAuthTokens(): Chainable<void>;
      clearAuthTokens(): Chainable<void>;

      // Ingredient commands
      addBunIngredient(): Chainable<void>;
      addMainIngredient(index?: number): Chainable<void>;
      addSauceIngredient(): Chainable<void>;
      clickIngredientCard(): Chainable<void>;

      // Modal commands
      closeIngredientModal(): Chainable<void>;
      closeOrderModal(): Chainable<void>;
      closeModalByOverlay(): Chainable<void>;

      // Constructor commands
      placeOrder(): Chainable<void>;
      verifyBunAdded(): Chainable<void>;
      verifyIngredientsAdded(): Chainable<void>;

      // Helper commands
      visitAndWaitForIngredients(): Chainable<void>;
    }
  }
}

/**
 * Auth Commands
 */

Cypress.Commands.add('setAuthTokens', () => {
  localStorage.setItem('refreshToken', TEST_DATA.auth.refreshToken);
  cy.setCookie('accessToken', TEST_DATA.auth.accessToken);
});

Cypress.Commands.add('clearAuthTokens', () => {
  localStorage.removeItem('refreshToken');
  cy.clearCookie('accessToken');
});

/**
 * Ingredient Commands
 */

Cypress.Commands.add('addBunIngredient', () => {
  cy.get(SELECTORS.ingredients.bunIngredient).first().click();
});

Cypress.Commands.add('addMainIngredient', (index = 1) => {
  const mainSelector =
    index === 1
      ? SELECTORS.ingredients.mainIngredient1
      : SELECTORS.ingredients.mainIngredient2;
  cy.get(mainSelector).first().click();
});

Cypress.Commands.add('addSauceIngredient', () => {
  cy.get(SELECTORS.ingredients.sauceIngredient).first().click();
});

Cypress.Commands.add('clickIngredientCard', () => {
  cy.get(SELECTORS.ingredients.ingredientCard).first().click();
});

/**
 * Modal Commands
 */

Cypress.Commands.add('closeIngredientModal', () => {
  cy.get(SELECTORS.modals.closeButton).click();
});

Cypress.Commands.add('closeOrderModal', () => {
  cy.get(SELECTORS.modals.closeButton).click();
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(SELECTORS.modals.overlay).click({ force: true });
});

/**
 * Constructor Commands
 */

Cypress.Commands.add('placeOrder', () => {
  cy.get(SELECTORS.constructor.orderButton).click();
});

Cypress.Commands.add('verifyBunAdded', () => {
  cy.get(SELECTORS.constructor.bunTop).should(
    'contain',
    TEST_DATA.ingredients.bun.name
  );
});

Cypress.Commands.add('verifyIngredientsAdded', () => {
  cy.get(SELECTORS.constructor.filling).should(
    'contain',
    TEST_DATA.ingredients.main1.name
  );
});

/**
 * Helper Commands
 */

Cypress.Commands.add('visitAndWaitForIngredients', () => {
  cy.visit('/');
  cy.wait('@getIngredients');
});

export {};
