import {
  userSlice,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../slices/userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const mockError = {
  success: false,
  message: 'Authentication failed'
};

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthLoading: false,
    isAuthChecked: false,
    errorText: ''
  };

  describe('getUser', () => {
    it('should set user on getUser fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        getUser.fulfilled(mockUser, '')
      );

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.errorText).toBe('');
    });

    it('should set isAuthLoading and isAuthChecked on getUser pending', () => {
      const state = userSlice.reducer(initialState, getUser.pending(''));

      expect(state.isAuthLoading).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.errorText).toBe('');
    });

    it('should set error on getUser rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, isAuthLoading: true },
        getUser.rejected(null, '', undefined, mockError)
      );

      expect(state.user).toBeNull();
      expect(state.isAuthLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.errorText).toBe('Authentication failed');
    });

    it('should use default error message when getUser rejected with undefined payload', () => {
      const state = userSlice.reducer(
        initialState,
        getUser.rejected(null, '', undefined, undefined)
      );

      expect(state.errorText).toBe('Неизвестная ошибка');
    });
  });

  describe('loginUser', () => {
    it('should set user on loginUser fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        loginUser.fulfilled(mockUser, '', {
          email: 'test@example.com',
          password: 'password'
        })
      );

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.errorText).toBe('');
    });

    it('should set isAuthLoading on loginUser pending', () => {
      const state = userSlice.reducer(
        initialState,
        loginUser.pending('', {
          email: 'test@example.com',
          password: 'password'
        })
      );

      expect(state.isAuthLoading).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.errorText).toBe('');
    });

    it('should set error on loginUser rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, isAuthLoading: true },
        loginUser.rejected(
          null,
          '',
          { email: 'test@example.com', password: 'password' },
          mockError
        )
      );

      expect(state.user).toBeNull();
      expect(state.isAuthLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.errorText).toBe('Authentication failed');
    });
  });

  describe('logoutUser', () => {
    it('should clear user on logoutUser fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        isAuthChecked: true
      };

      const state = userSlice.reducer(
        stateWithUser,
        logoutUser.fulfilled(undefined, '')
      );

      expect(state.user).toBeNull();
    });
  });

  describe('registerUser', () => {
    it('should set user on registerUser fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        registerUser.fulfilled(mockUser, '', {
          email: 'test@example.com',
          name: 'Test',
          password: 'pass'
        })
      );

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthLoading).toBe(false);
      expect(state.errorText).toBe('');
    });

    it('should set isAuthLoading on registerUser pending', () => {
      const state = userSlice.reducer(
        initialState,
        registerUser.pending('', {
          email: 'test@example.com',
          name: 'Test',
          password: 'pass'
        })
      );

      expect(state.isAuthLoading).toBe(true);
      expect(state.errorText).toBe('');
    });

    it('should set error on registerUser rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, isAuthLoading: true },
        registerUser.rejected(
          null,
          '',
          { email: 'test@example.com', name: 'Test', password: 'pass' },
          mockError
        )
      );

      expect(state.user).toBeNull();
      expect(state.isAuthLoading).toBe(false);
      expect(state.errorText).toBe('Authentication failed');
    });
  });

  describe('updateUser', () => {
    it('should update user on updateUser fulfilled', () => {
      const state = userSlice.reducer(
        { ...initialState, user: mockUser },
        updateUser.fulfilled(mockUser, '', {
          email: 'test@example.com',
          name: 'Updated Test',
          password: 'pass'
        })
      );

      expect(state.user).toEqual(mockUser);
      expect(state.errorText).toBe('');
    });

    it('should set error on updateUser rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, user: mockUser },
        updateUser.rejected(
          null,
          '',
          { email: 'test@example.com', name: 'Updated Test', password: 'pass' },
          mockError
        )
      );

      expect(state.errorText).toBe('Authentication failed');
    });
  });

  describe('auth flow lifecycle', () => {
    it('should handle complete login flow: pending -> fulfilled', () => {
      let state: any = initialState;

      state = userSlice.reducer(
        state,
        loginUser.pending('', {
          email: 'test@example.com',
          password: 'password'
        })
      );
      expect(state.isAuthLoading).toBe(true);

      state = userSlice.reducer(
        state,
        loginUser.fulfilled(mockUser, '', {
          email: 'test@example.com',
          password: 'password'
        })
      );
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle complete login flow: pending -> rejected', () => {
      let state: any = initialState;

      state = userSlice.reducer(
        state,
        loginUser.pending('', {
          email: 'test@example.com',
          password: 'password'
        })
      );
      expect(state.isAuthLoading).toBe(true);

      state = userSlice.reducer(
        state,
        loginUser.rejected(
          null,
          '',
          { email: 'test@example.com', password: 'password' },
          mockError
        )
      );
      expect(state.user).toBeNull();
      expect(state.isAuthLoading).toBe(false);
      expect(state.errorText).toBe('Authentication failed');
    });

    it('should handle complete logout flow', () => {
      let state: any = {
        ...initialState,
        user: mockUser,
        isAuthChecked: true
      };

      state = userSlice.reducer(state, logoutUser.fulfilled(undefined, ''));

      expect(state.user).toBeNull();
    });
  });
});
