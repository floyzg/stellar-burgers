import './commands';

beforeEach(() => {
  // Intercept all API calls
  cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', '**/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );
  cy.intercept('POST', '**/auth/token', { fixture: 'user.json' }).as(
    'touchToken'
  );
});
