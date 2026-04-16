import '@testing-library/jest-dom';

// Mock environment variables
process.env.BURGER_API_URL = 'http://localhost:3000';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock as any;

// Mock fetch
global.fetch = jest.fn();
