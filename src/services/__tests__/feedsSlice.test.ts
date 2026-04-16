import { feedSlice, fetchFeeds } from '../slices/feedsSlice';
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

const mockFeedsData = {
  orders: mockOrders,
  total: 100,
  totalToday: 5
};

const mockError = {
  success: false,
  message: 'Failed to fetch feeds'
};

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    feed: {
      total: 0,
      totalToday: 0
    },
    isLoading: false,
    isLoaded: false,
    errorMessage: ''
  };

  describe('fetchFeeds pending', () => {
    it('should set isLoading to true and isLoaded to false when request starts', () => {
      const state = feedSlice.reducer(initialState, fetchFeeds.pending(''));

      expect(state.isLoading).toBe(true);
      expect(state.isLoaded).toBe(false);
    });
  });

  describe('fetchFeeds fulfilled', () => {
    it('should set feeds data when request succeeds', () => {
      const state = feedSlice.reducer(
        { ...initialState, isLoading: true },
        fetchFeeds.fulfilled(mockFeedsData, '')
      );

      expect(state.orders).toEqual(mockOrders);
      expect(state.feed.total).toBe(100);
      expect(state.feed.totalToday).toBe(5);
      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
    });

    it('should replace old orders with new ones', () => {
      const oldState = {
        orders: [mockOrders[0]],
        feed: {
          total: 10,
          totalToday: 1
        },
        isLoading: true,
        isLoaded: false,
        errorMessage: ''
      };

      const state = feedSlice.reducer(
        oldState,
        fetchFeeds.fulfilled(mockFeedsData, '')
      );

      expect(state.orders).toEqual(mockOrders);
      expect(state.orders).toHaveLength(2);
      expect(state.feed.total).toBe(100);
    });
  });

  describe('fetchFeeds rejected', () => {
    it('should set error message when request fails', () => {
      const state = feedSlice.reducer(
        { ...initialState, isLoading: true },
        fetchFeeds.rejected(null, '', undefined, mockError)
      );

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.errorMessage).toBe('Failed to fetch feeds');
    });

    it('should use default error message when payload is undefined', () => {
      const state = feedSlice.reducer(
        initialState,
        fetchFeeds.rejected(null, '', undefined, undefined)
      );

      expect(state.errorMessage).toBe('Неизвестная ошибка');
    });
  });

  describe('fetchFeeds thunk integration', () => {
    it('should handle complete request lifecycle: pending -> fulfilled', () => {
      let state: any = initialState;

      state = feedSlice.reducer(state, fetchFeeds.pending(''));
      expect(state.isLoading).toBe(true);

      state = feedSlice.reducer(state, fetchFeeds.fulfilled(mockFeedsData, ''));
      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
      expect(state.orders).toEqual(mockOrders);
      expect(state.feed).toEqual({ total: 100, totalToday: 5 });
    });
  });
});
