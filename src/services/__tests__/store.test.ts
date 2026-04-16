import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '../slices/userSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { burgerConstructorSlice } from '../slices/burgerConstructorSlice';
import { feedSlice } from '../slices/feedsSlice';
import { ordersSlice } from '../slices/ordersSlice';

describe('rootReducer', () => {
  const rootReducer = combineReducers({
    user: userSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    feed: feedSlice.reducer,
    orders: ordersSlice.reducer
  });

  it('should return initial state when called with undefined state and unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      user: {
        user: null,
        isAuthLoading: false,
        isAuthChecked: false,
        errorText: ''
      },
      ingredients: {
        ingredients: [],
        isLoading: false,
        isLoaded: false,
        errorMessage: ''
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null
      },
      feed: {
        orders: [],
        feed: {
          total: 0,
          totalToday: 0
        },
        isLoading: false,
        isLoaded: false,
        errorMessage: ''
      },
      orders: {
        orders: [],
        isLoading: false,
        isLoaded: false,
        errorMessage: ''
      }
    });
  });

  it('should have correct initial states for all slices', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const state = store.getState();

    // Verify user slice initial state
    expect(state.user.user).toBeNull();
    expect(state.user.isAuthLoading).toBe(false);
    expect(state.user.isAuthChecked).toBe(false);

    // Verify ingredients slice initial state
    expect(state.ingredients.ingredients).toEqual([]);
    expect(state.ingredients.isLoading).toBe(false);
    expect(state.ingredients.isLoaded).toBe(false);

    // Verify burger constructor initial state
    expect(state.burgerConstructor.bun).toBeNull();
    expect(state.burgerConstructor.ingredients).toEqual([]);
    expect(state.burgerConstructor.orderRequest).toBe(false);
    expect(state.burgerConstructor.orderModalData).toBeNull();

    // Verify feed slice initial state
    expect(state.feed.orders).toEqual([]);
    expect(state.feed.feed.total).toBe(0);
    expect(state.feed.feed.totalToday).toBe(0);

    // Verify orders slice initial state
    expect(state.orders.orders).toEqual([]);
    expect(state.orders.isLoading).toBe(false);
    expect(state.orders.isLoaded).toBe(false);
  });
});
