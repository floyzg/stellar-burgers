describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Adding ingredients', () => {
    it('should add a bun ingredient to the constructor', () => {
      // Get first bun ingredient
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();

      // Verify bun is added to top of constructor
      cy.get('[data-testid="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );
    });

    it('should add a main ingredient to the constructor', () => {
      // Add bun first
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();

      // Add main ingredient
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();

      // Verify ingredient is added to middle section
      cy.get('[data-testid="constructor-filling"]').should(
        'contain',
        'Мясо бессмертных животных'
      );
    });

    it('should add sauce ingredient to the constructor', () => {
      // Add bun first
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();

      // Add sauce ingredient
      cy.get('[data-testid="ingredient-sauce-643d69a5c3f7b9001cef0374"]')
        .first()
        .click();

      // Verify ingredient is added
      cy.get('[data-testid="constructor-filling"]').should(
        'contain',
        'Соус Spicy-X'
      );
    });

    it('should add multiple ingredients to the constructor', () => {
      // Add bun
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();

      // Add multiple main and sauce ingredients
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-sauce-643d69a5c3f7b9001cef0374"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0373"]')
        .first()
        .click();

      // Verify all ingredients are added
      cy.get('[data-testid="constructor-filling"]').should(
        'contain',
        'Мясо бессмертных животных'
      );
      cy.get('[data-testid="constructor-filling"]').should(
        'contain',
        'Соус Spicy-X'
      );
      cy.get('[data-testid="constructor-filling"]').should(
        'contain',
        'ВРЕМЕННОЕ ПОСТОЯНСТВО ЯЙЦА'
      );
    });
  });

  describe('Ingredient details modal', () => {
    it('should open ingredient details modal on ingredient click in ingredient list', () => {
      // Click on ingredient
      cy.get('[data-testid="ingredient-card-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();

      // Verify modal is visible
      cy.get('[data-testid="ingredient-details-modal"]').should('be.visible');

      // Verify correct ingredient name is displayed
      cy.get('[data-testid="ingredient-modal-name"]').should(
        'contain',
        'Мясо бессмертных животных'
      );
    });

    it('should display correct ingredient data in modal', () => {
      cy.get('[data-testid="ingredient-card-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();

      cy.get('[data-testid="ingredient-details-modal"]').should('be.visible');
      cy.get('[data-testid="ingredient-modal-calories"]').should(
        'contain',
        '4242'
      );
      cy.get('[data-testid="ingredient-modal-proteins"]').should(
        'contain',
        '433'
      );
      cy.get('[data-testid="ingredient-modal-fat"]').should('contain', '244');
      cy.get('[data-testid="ingredient-modal-carbs"]').should('contain', '33');
    });

    it('should close modal when clicking close button', () => {
      // Open modal
      cy.get('[data-testid="ingredient-card-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-details-modal"]').should('be.visible');

      // Click close button
      cy.get('[data-testid="modal-close-button"]').click();

      // Verify modal is closed
      cy.get('[data-testid="ingredient-details-modal"]').should('not.exist');
    });

    it('should close modal when clicking overlay', () => {
      // Open modal
      cy.get('[data-testid="ingredient-card-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-details-modal"]').should('be.visible');

      // Click overlay
      cy.get('[data-testid="modal-overlay"]').click({ force: true });

      // Verify modal is closed
      cy.get('[data-testid="ingredient-details-modal"]').should('not.exist');
    });
  });

  describe('Order creation', () => {
    it('should redirect to login when unauthenticated user clicks order button', () => {
      // Add ingredients to constructor
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();

      // Click order button
      cy.get('[data-testid="order-button"]').click();

      // Verify redirect to login
      cy.url().should('include', '/login');
    });

    it('should create order with valid burger composition', () => {
      // Set authentication tokens
      cy.setAuthTokens();

      cy.visit('/');
      cy.wait('@getIngredients');

      // Build burger
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-sauce-643d69a5c3f7b9001cef0374"]')
        .first()
        .click();

      // Place order
      cy.get('[data-testid="order-button"]').click();

      // Wait for order request and verify
      cy.wait('@createOrder');

      // Verify order modal appears with order number
      cy.get('[data-testid="order-details-modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]').should('contain', '12345');
    });

    it('should close order modal and clear constructor on modal close', () => {
      cy.setAuthTokens();

      cy.visit('/');
      cy.wait('@getIngredients');

      // Build burger
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();

      // Place order
      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');

      // Verify order modal is open
      cy.get('[data-testid="order-details-modal"]').should('be.visible');

      // Close modal
      cy.get('[data-testid="modal-close-button"]').click();

      // Verify modal is closed
      cy.get('[data-testid="order-details-modal"]').should('not.exist');

      // Verify constructor is empty
      cy.get('[data-testid="constructor-empty"]').should('be.visible');
    });

    it('should display correct order details in modal', () => {
      cy.setAuthTokens();

      cy.visit('/');
      cy.wait('@getIngredients');

      // Build burger
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();

      // Place order
      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');

      // Verify modal content
      cy.get('[data-testid="order-details-modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]').should('contain', '12345');
      cy.get('[data-testid="order-name"]').should('contain', 'Space burger');
    });
  });

  describe('Constructor state management', () => {
    it('should calculate total price correctly', () => {
      // Add bun (1255)
      cy.get('[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]')
        .first()
        .click();

      // Add main (1337)
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();

      // Price should be: (1255 * 2 for bun) + 1337 = 3847
      cy.get('[data-testid="order-price"]').should('contain', '3847');
    });

    it('should disable order button when constructor is empty', () => {
      cy.get('[data-testid="order-button"]').should('be.disabled');
    });

    it('should disable order button when only sauce/main ingredient is added without bun', () => {
      cy.get('[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]')
        .first()
        .click();
      cy.get('[data-testid="order-button"]').should('be.disabled');
    });
  });
});
