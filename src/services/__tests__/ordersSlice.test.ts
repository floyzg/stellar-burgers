import {
  ordersSlice,
  fetchOrders,
  getOrderByNumber
} from '../slices/ordersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '123',
    number: 1,
    name: 'Test Order 1',
    status: 'done',
    createdAt: '2023-01-01T10:00:00.000Z',
    updatedAt: '2023-01-01T10:05:00.000Z',
    ingredients: ['643d69a5c3f7b9001cef0370', '643d69a5c3f7b9001cef0372']
  },
  {
    _id: '124',
    number: 2,
    name: 'Test Order 2',
    status: 'pending',
    createdAt: '2023-01-02T10:00:00.000Z',
    updatedAt: '2023-01-02T10:05:00.000Z',
    ingredients: ['643d69a5c3f7b9001cef0372', '643d69a5c3f7b9001cef0374']
  }
];

const mockSingleOrder: TOrder = mockOrders[0];

const mockError = {
  success: false,
  message: 'Failed to fetch orders'
};

describe('ordersSlice', () => {
  const initialState = {
    orders: [],
    orderByNumber: undefined,
    isLoading: false,
    isLoaded: false,
    errorMessage: ''
  };

  describe('fetchOrders pending', () => {
    it('should set isLoading to true when request starts', () => {
      const state = ordersSlice.reducer(initialState, fetchOrders.pending(''));

      expect(state.isLoading).toBe(true);
      expect(state.isLoaded).toBe(false);
    });
  });

  describe('fetchOrders fulfilled', () => {
    it('should set orders data when request succeeds', () => {
      const state = ordersSlice.reducer(
        { ...initialState, isLoading: true },
        fetchOrders.fulfilled(mockOrders, '')
      );

      expect(state.orders).toEqual(mockOrders);
      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.errorMessage).toBe('');
    });

    it('should handle empty orders array', () => {
      const state = ordersSlice.reducer(
        initialState,
        fetchOrders.fulfilled([], '')
      );

      expect(state.orders).toEqual([]);
      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
    });
  });

  describe('fetchOrders rejected', () => {
    it('should set error message when request fails', () => {
      const state = ordersSlice.reducer(
        { ...initialState, isLoading: true },
        fetchOrders.rejected(null, '', undefined, mockError)
      );

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.errorMessage).toBe('Failed to fetch orders');
    });

    it('should use default error message when payload is undefined', () => {
      const state = ordersSlice.reducer(
        initialState,
        fetchOrders.rejected(null, '', undefined, undefined)
      );

      expect(state.errorMessage).toBe('Неизвестная ошибка');
    });
  });

  describe('getOrderByNumber pending', () => {
    it('should set orderByNumber to undefined when request starts', () => {
      const stateWithOrder = {
        ...initialState,
        orderByNumber: mockSingleOrder
      };

      const state = ordersSlice.reducer(
        stateWithOrder,
        getOrderByNumber.pending('', 1)
      );

      expect(state.orderByNumber).toBeUndefined();
    });
  });

  describe('getOrderByNumber fulfilled', () => {
    it('should set orderByNumber when request succeeds', () => {
      const state = ordersSlice.reducer(
        initialState,
        getOrderByNumber.fulfilled(mockSingleOrder, '', 1)
      );

      expect(state.orderByNumber).toEqual(mockSingleOrder);
      expect(state.orderByNumber?.number).toBe(1);
    });

    it('should replace old order with new one', () => {
      const stateWithOldOrder = {
        ...initialState,
        orderByNumber: mockOrders[1]
      };

      const state = ordersSlice.reducer(
        stateWithOldOrder,
        getOrderByNumber.fulfilled(mockSingleOrder, '', 1)
      );

      expect(state.orderByNumber?.number).toBe(1);
      expect(state.orderByNumber?.name).toBe('Test Order 1');
    });
  });

  describe('fetchOrders thunk integration', () => {
    it('should handle complete request lifecycle: pending -> fulfilled', () => {
      let state: any = initialState;

      state = ordersSlice.reducer(state, fetchOrders.pending(''));
      expect(state.isLoading).toBe(true);
      expect(state.isLoaded).toBe(false);

      state = ordersSlice.reducer(state, fetchOrders.fulfilled(mockOrders, ''));
      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.orders).toEqual(mockOrders);
    });

    it('should handle request lifecycle: pending -> rejected', () => {
      let state: any = initialState;

      state = ordersSlice.reducer(state, fetchOrders.pending(''));
      expect(state.isLoading).toBe(true);

      state = ordersSlice.reducer(
        state,
        fetchOrders.rejected(null, '', undefined, mockError)
      );
      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.errorMessage).toBe('Failed to fetch orders');
    });
  });
});
