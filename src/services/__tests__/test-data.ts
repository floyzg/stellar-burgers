/**
 * Jest тестовые данные - константы для использования в тестах
 * Упрощает изменение тестовых данных и избегает дублирования
 */

import {
  TIngredient,
  TConstructorIngredient,
  TUser,
  TOrder
} from '@utils-types';
import { v4 as uuid } from 'uuid';

export const TEST_INGREDIENTS = {
  bun: {
    _id: '643d69a5c3f7b9001cef0370',
    name: 'Краторная булка N-200i',
    type: 'bun' as const,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
  } as TIngredient,

  main: {
    _id: '643d69a5c3f7b9001cef0372',
    name: 'Мясо бессмертных животных',
    type: 'main' as const,
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 4242,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  } as TIngredient,

  sauce: {
    _id: '643d69a5c3f7b9001cef0374',
    name: 'Соус Spicy-X',
    type: 'sauce' as const,
    proteins: 30,
    fat: 20,
    carbohydrates: 42,
    calories: 99,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'
  } as TIngredient
};

/**
 * Вспомогательная функция для создания TConstructorIngredient из TIngredient
 */
export const createConstructorIngredient = (
  ingredient: TIngredient
): TConstructorIngredient => ({
  ...ingredient,
  id: uuid()
});

/**
 * Тестовые пользователи
 */
export const TEST_USERS = {
  validUser: {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123'
  } as TUser,

  secondUser: {
    email: 'user2@example.com',
    name: 'User Two',
    password: 'password456'
  } as TUser
};

/**
 * Тестовые заказы
 */
export const TEST_ORDERS = {
  order: {
    _id: '507f1f77bcf86cd799439011',
    number: 12345,
    status: 'created' as const,
    ingredients: ['643d69a5c3f7b9001cef0370', '643d69a5c3f7b9001cef0372'],
    createdAt: '2026-04-16T10:30:00.000Z',
    updatedAt: '2026-04-16T10:30:00.000Z',
    name: 'Stellar burger'
  } as TOrder,

  secondOrder: {
    _id: '507f1f77bcf86cd799439012',
    number: 12346,
    status: 'done' as const,
    ingredients: ['643d69a5c3f7b9001cef0374'],
    createdAt: '2026-04-15T10:30:00.000Z',
    updatedAt: '2026-04-15T10:35:00.000Z',
    name: 'Spicy burger'
  } as TOrder
};

/**
 * API ответы
 */
export const TEST_API_RESPONSES = {
  authTokens: {
    success: true,
    accessToken: 'Bearer test_access_token_12345',
    refreshToken: 'test_refresh_token_12345',
    user: {
      email: TEST_USERS.validUser.email,
      name: TEST_USERS.validUser.name
    }
  },

  order: {
    success: true,
    name: TEST_ORDERS.order.name,
    order: TEST_ORDERS.order
  },

  ordersArray: {
    success: true,
    orders: [TEST_ORDERS.order, TEST_ORDERS.secondOrder],
    total: 12345,
    totalToday: 5000
  }
};
