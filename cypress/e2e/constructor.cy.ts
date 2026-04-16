import { SELECTORS } from '../support/selectors';
import { TEST_DATA } from '../support/test-data';

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Adding ingredients', () => {
    it('should add a bun ingredient to the constructor', () => {
      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.constructor.bunTop).should(
        'contain',
        TEST_DATA.ingredients.bun.name
      );
    });

    it('should add a main ingredient to the constructor', () => {
      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.constructor.filling).should(
        'contain',
        TEST_DATA.ingredients.main1.name
      );
    });

    it('should add sauce ingredient to the constructor', () => {
      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.ingredients.sauceIngredient).first().click();

      cy.get(SELECTORS.constructor.filling).should(
        'contain',
        TEST_DATA.ingredients.sauce.name
      );
    });

    it('should add multiple ingredients to the constructor', () => {
      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.ingredients.sauceIngredient).first().click();

      cy.get(SELECTORS.ingredients.mainIngredient2).first().click();

      cy.get(SELECTORS.constructor.filling).should(
        'contain',
        TEST_DATA.ingredients.main1.name
      );
      cy.get(SELECTORS.constructor.filling).should(
        'contain',
        TEST_DATA.ingredients.sauce.name
      );
      cy.get(SELECTORS.constructor.filling).should(
        'contain',
        TEST_DATA.ingredients.main2.name
      );
    });
  });

  describe('Ingredient details modal', () => {
    it('should open ingredient details modal on ingredient click in ingredient list', () => {
      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.modals.ingredientDetails).should('be.visible');

      cy.get(SELECTORS.modals.ingredientName).should(
        'contain',
        TEST_DATA.ingredients.main1.name
      );
    });

    it('should display correct ingredient data in modal', () => {
      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.modals.ingredientDetails).should('be.visible');
      cy.get(SELECTORS.modals.ingredientCalories).should(
        'contain',
        TEST_DATA.modal.ingredientCalories
      );
      cy.get(SELECTORS.modals.ingredientProteins).should(
        'contain',
        TEST_DATA.modal.ingredientProteins
      );
      cy.get(SELECTORS.modals.ingredientFat).should(
        'contain',
        TEST_DATA.modal.ingredientFat
      );
      cy.get(SELECTORS.modals.ingredientCarbs).should(
        'contain',
        TEST_DATA.modal.ingredientCarbs
      );
    });

    it('should close modal when clicking close button', () => {
      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.modals.ingredientDetails).should('be.visible');

      cy.get(SELECTORS.modals.closeButton).click();

      cy.get(SELECTORS.modals.ingredientDetails).should('not.exist');
    });

    it('should close modal when clicking overlay', () => {
      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.modals.ingredientDetails).should('be.visible');

      cy.get(SELECTORS.modals.overlay).click({ force: true });

      cy.get(SELECTORS.modals.ingredientDetails).should('not.exist');
    });
  });

  describe('Order creation', () => {
    it('should redirect to login when unauthenticated user clicks order button', () => {
      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.constructor.orderButton).click();

      cy.url().should('include', '/login');
    });

    it('should create order with valid burger composition', () => {
      cy.setAuthTokens();

      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.ingredients.sauceIngredient).first().click();

      cy.get(SELECTORS.constructor.orderButton).click();

      cy.wait('@createOrder');

      cy.get(SELECTORS.modals.orderDetails).should('be.visible');
      cy.get(SELECTORS.modals.orderNumber).should(
        'contain',
        TEST_DATA.order.number
      );
    });

    it('should close order modal and clear constructor on modal close', () => {
      cy.setAuthTokens();

      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.constructor.orderButton).click();

      cy.wait('@createOrder');

      cy.get(SELECTORS.modals.orderDetails).should('be.visible');

      cy.get(SELECTORS.modals.closeButton).click();

      cy.get(SELECTORS.modals.orderDetails).should('not.exist');
      cy.get(SELECTORS.constructor.constructorEmpty).should('be.visible');
    });

    it('should display correct order details in modal', () => {
      cy.setAuthTokens();

      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.constructor.orderButton).click();

      cy.wait('@createOrder');

      cy.get(SELECTORS.modals.orderDetails).should('be.visible');
      cy.get(SELECTORS.modals.orderNumber).should(
        'contain',
        TEST_DATA.order.number
      );
      cy.get(SELECTORS.modals.orderName).should(
        'contain',
        TEST_DATA.order.name
      );
    });
  });

  describe('Constructor state management', () => {
    it('should calculate total price correctly', () => {
      cy.get(SELECTORS.ingredients.bunIngredient).first().click();

      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.constructor.orderPrice).should(
        'contain',
        TEST_DATA.order.price
      );
    });

    it('should disable order button when constructor is empty', () => {
      cy.get(SELECTORS.constructor.orderButton).should('be.disabled');
    });

    it('should disable order button when only main ingredient is added without bun', () => {
      cy.get(SELECTORS.ingredients.mainIngredient1).first().click();

      cy.get(SELECTORS.constructor.orderButton).should('be.disabled');
    });
  });
});
