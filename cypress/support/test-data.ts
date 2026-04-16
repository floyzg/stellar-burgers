/**
 * Тестовые данные - константы для использования в тестах
 * Упрощает изменение тестовых данных и избегает дублирования
 */

export const TEST_DATA = {
  ingredients: {
    bun: {
      id: '643d69a5c3f7b9001cef0370',
      name: 'Краторная булка N-200i'
    },
    main1: {
      id: '643d69a5c3f7b9001cef0372',
      name: 'Мясо бессмертных животных'
    },
    main2: {
      id: '643d69a5c3f7b9001cef0373',
      name: 'ВРЕМЕННОЕ ПОСТОЯНСТВО ЯЙЦА'
    },
    sauce: {
      id: '643d69a5c3f7b9001cef0374',
      name: 'Соус Spicy-X'
    }
  },

  modal: {
    ingredientCalories: '4242',
    ingredientProteins: '433',
    ingredientFat: '244',
    ingredientCarbs: '33'
  },

  order: {
    number: '12345',
    name: 'Space burger',
    price: '3847' // (1255 * 2) + 1337
  },

  auth: {
    accessToken: 'Bearer test_access_token_12345',
    refreshToken: 'test_refresh_token_12345'
  }
};
