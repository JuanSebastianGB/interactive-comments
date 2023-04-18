import { apiResponse } from '../components';
import { getInitialStateFromStorage } from './getInitialStateFromStorage';

import { vi } from 'vitest';

describe('', () => {
  it('test_happy_path_retrieves_valid_local_storage_data', () => {
    const mockLocalStorageData = JSON.stringify(apiResponse);
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(mockLocalStorageData),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    const result = getInitialStateFromStorage();
    expect(result).toEqual(apiResponse);
  });
  it('test_happy_path_no_local_storage_data_returns_api_response', () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(null),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    const result = getInitialStateFromStorage();
    expect(result).toEqual(apiResponse);
  });
  it('test_edge_case_local_storage_data_is_invalid_json', () => {
    const mockLocalStorageData = 'invalid json';
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(mockLocalStorageData),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    const result = getInitialStateFromStorage();
    expect(result).toEqual({});
  });
  it('test_edge_case_recovered_data_not_object', () => {
    const mockLocalStorageData = JSON.stringify('not an object');
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(mockLocalStorageData),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    const result = getInitialStateFromStorage();
    expect(result).toEqual({});
  });
  it('test_happy_path_empty_local_storage_data_returns_api_response', () => {
    const mockLocalStorageData = JSON.stringify({});
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(mockLocalStorageData),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    const result = getInitialStateFromStorage();
    expect(result).toEqual(apiResponse);
  });
  it('test_edge_case_current_user_not_object', () => {
    const mockLocalStorageData = JSON.stringify({
      currentUser: 'not an object',
    });
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(mockLocalStorageData),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    const result = getInitialStateFromStorage();
    expect(result).toEqual({});
  });
});
