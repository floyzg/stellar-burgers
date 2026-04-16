import {
  burgerConstructorSlice,
  addIngredient,
  moveIngredient,
  deleteIngredient,
  resetState,
  burgerConstructorInitialState
} from '../slices/burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { TEST_INGREDIENTS, createConstructorIngredient } from './test-data';

describe('burgerConstructorSlice', () => {
  const initialState = burgerConstructorInitialState;

  describe('addIngredient', () => {
    it('should add bun ingredient to state', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.bun)
      );

      expect(state.bun).not.toBeNull();
      expect(state.bun?.name).toBe(TEST_INGREDIENTS.bun.name);
      expect(state.bun?.type).toBe('bun');
      expect(state.bun?.price).toBe(TEST_INGREDIENTS.bun.price);
      expect(state.bun?.id).toBeDefined();
    });

    it('should add main ingredient to ingredients array', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].name).toBe('Мясо бессмертных животных');
      expect(state.ingredients[0].type).toBe('main');
      expect(state.ingredients[0].id).toBeDefined();
    });

    it('should add sauce ingredient to ingredients array', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.sauce)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].name).toBe(TEST_INGREDIENTS.sauce.name);
      expect(state.ingredients[0].type).toBe('sauce');
    });

    it('should add multiple ingredients to ingredients array', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.sauce)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.main)
      );

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients[0].type).toBe('main');
      expect(state.ingredients[1].type).toBe('sauce');
      expect(state.ingredients[2].type).toBe('main');
    });

    it('should replace bun when adding new bun ingredient', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.bun)
      );
      expect(state.bun?.name).toBe(TEST_INGREDIENTS.bun.name);

      const anotherBun = {
        ...TEST_INGREDIENTS.bun,
        _id: '643d69a5c3f7b9001cef0371',
        name: 'Флюоресцентная булка R2D3'
      };
      state = burgerConstructorSlice.reducer(state, addIngredient(anotherBun));

      expect(state.bun?.name).toBe('Флюоресцентная булка R2D3');
    });

    it('should generate unique id for each ingredient', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      const firstId = state.ingredients[0].id;

      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.main)
      );
      const secondId = state.ingredients[1].id;

      expect(firstId).not.toBe(secondId);
      expect(firstId).toBeDefined();
      expect(secondId).toBeDefined();
    });
  });

  describe('deleteIngredient', () => {
    it('should delete ingredient at specified index', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.sauce)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.main)
      );

      expect(state.ingredients).toHaveLength(3);

      state = burgerConstructorSlice.reducer(state, deleteIngredient(1));

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0].type).toBe('main');
      expect(state.ingredients[1].type).toBe('main');
    });

    it('should not delete if index is out of bounds', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );

      expect(state.ingredients).toHaveLength(1);

      state = burgerConstructorSlice.reducer(state, deleteIngredient(5));

      expect(state.ingredients).toHaveLength(1);
    });

    it('should handle deletion from empty array', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        deleteIngredient(0)
      );

      expect(state.ingredients).toHaveLength(0);
    });

    it('should delete first ingredient when index is 0', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.sauce)
      );

      state = burgerConstructorSlice.reducer(state, deleteIngredient(0));

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].type).toBe('sauce');
    });
  });

  describe('moveIngredient', () => {
    it('should move ingredient down when direction is "down"', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.sauce)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.main)
      );

      const firstIngredientId = state.ingredients[0].id;
      const secondIngredientId = state.ingredients[1].id;

      state = burgerConstructorSlice.reducer(
        state,
        moveIngredient({ index: 0, direction: 'down' })
      );

      expect(state.ingredients[0].id).toBe(secondIngredientId);
      expect(state.ingredients[1].id).toBe(firstIngredientId);
    });

    it('should move ingredient up when direction is "up"', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.sauce)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.main)
      );

      const secondIngredientId = state.ingredients[1].id;
      const thirdIngredientId = state.ingredients[2].id;

      state = burgerConstructorSlice.reducer(
        state,
        moveIngredient({ index: 2, direction: 'up' })
      );

      expect(state.ingredients[1].id).toBe(thirdIngredientId);
      expect(state.ingredients[2].id).toBe(secondIngredientId);
    });

    it('should not move ingredient down when at last position', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.sauce)
      );

      const sauceId = state.ingredients[1].id;

      state = burgerConstructorSlice.reducer(
        state,
        moveIngredient({ index: 1, direction: 'down' })
      );

      expect(state.ingredients[1].id).toBe(sauceId);
    });

    it('should not move ingredient up when at first position', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.sauce)
      );

      const mainId = state.ingredients[0].id;

      state = burgerConstructorSlice.reducer(
        state,
        moveIngredient({ index: 0, direction: 'up' })
      );

      expect(state.ingredients[0].id).toBe(mainId);
    });

    it('should not move when index is out of bounds', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.main)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.sauce)
      );

      const originalState = JSON.stringify(state);

      state = burgerConstructorSlice.reducer(
        state,
        moveIngredient({ index: 10, direction: 'down' })
      );

      expect(JSON.stringify(state)).toBe(originalState);
    });
  });

  describe('resetState', () => {
    it('should reset all state to initial values', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(TEST_INGREDIENTS.bun)
      );
      state = burgerConstructorSlice.reducer(
        state,
        addIngredient(TEST_INGREDIENTS.main)
      );

      state = burgerConstructorSlice.reducer(state, resetState());

      expect(state.bun).toBeNull();
      expect(state.ingredients).toEqual([]);
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toBeNull();
    });

    it('should clear bun, ingredients, and order data', () => {
      let state: any = {
        bun: { ...TEST_INGREDIENTS.bun, id: '1' } as TConstructorIngredient,
        ingredients: [
          { ...TEST_INGREDIENTS.main, id: '2' } as TConstructorIngredient
        ],
        orderRequest: true,
        orderModalData: {
          _id: '123',
          status: 'done',
          name: 'Test Order',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
          number: 123,
          ingredients: ['1', '2']
        }
      };

      state = burgerConstructorSlice.reducer(state, resetState());

      expect(state.bun).toBeNull();
      expect(state.ingredients).toEqual([]);
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toBeNull();
    });
  });
});
