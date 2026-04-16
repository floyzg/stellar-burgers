/**
 * Cypress селекторы - константы для упрощения тестов
 * Используйте эти константы вместо строк селекторов
 * Это позволяет менять селекторы в одном месте
 */

// Ингредиенты
export const SELECTORS = {
  // Главная страница
  page: {
    root: '[data-testid="constructor-page"]'
  },

  // Ингредиенты
  ingredients: {
    bunIngredient: '[data-testid="ingredient-bun-643d69a5c3f7b9001cef0370"]',
    mainIngredient1: '[data-testid="ingredient-main-643d69a5c3f7b9001cef0372"]',
    mainIngredient2: '[data-testid="ingredient-main-643d69a5c3f7b9001cef0373"]',
    sauceIngredient:
      '[data-testid="ingredient-sauce-643d69a5c3f7b9001cef0374"]',
    ingredientCard: '[data-testid="ingredient-card-643d69a5c3f7b9001cef0372"]'
  },

  // Конструктор
  constructor: {
    bunTop: '[data-testid="constructor-bun-top"]',
    filling: '[data-testid="constructor-filling"]',
    bunBottom: '[data-testid="constructor-bun-bottom"]',
    orderButton: '[data-testid="order-button"]',
    orderPrice: '[data-testid="order-price"]',
    constructorEmpty: '[data-testid="constructor-empty"]'
  },

  // Модали
  modals: {
    ingredientDetails: '[data-testid="ingredient-details-modal"]',
    ingredientName: '[data-testid="ingredient-modal-name"]',
    ingredientCalories: '[data-testid="ingredient-modal-calories"]',
    ingredientProteins: '[data-testid="ingredient-modal-proteins"]',
    ingredientFat: '[data-testid="ingredient-modal-fat"]',
    ingredientCarbs: '[data-testid="ingredient-modal-carbs"]',
    orderDetails: '[data-testid="order-details-modal"]',
    orderNumber: '[data-testid="order-number"]',
    orderName: '[data-testid="order-name"]',
    closeButton: '[data-testid="modal-close-button"]',
    overlay: '[data-testid="modal-overlay"]'
  },

  // Авторизация
  auth: {
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    loginButton: '[data-testid="login-button"]',
    registerButton: '[data-testid="register-button"]'
  }
};
