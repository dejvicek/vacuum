import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { authApi } from '../api/auth';
import { tokenStorage } from '../api/auth/token-storage';

jest.mock('../api/auth');
jest.mock('../api/auth/token-storage');

const wrapper = ({ children }: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (tokenStorage.getToken as jest.Mock).mockReturnValue(null);
    (tokenStorage.getUser as jest.Mock).mockReturnValue(null);
  });

  describe('useAuth hook', () => {
    it('throws error when used outside AuthProvider', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleError.mockRestore();
    });

    it('provides initial unauthenticated state', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('initializes with stored user when token exists', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      (tokenStorage.getToken as jest.Mock).mockReturnValue('mock-token');
      (tokenStorage.getUser as jest.Mock).mockReturnValue(mockUser);
      (authApi.getProfile as jest.Mock).mockResolvedValue({ user: mockUser });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('clears stored data when token validation fails', async () => {
      (tokenStorage.getToken as jest.Mock).mockReturnValue('invalid-token');
      (tokenStorage.getUser as jest.Mock).mockReturnValue({ id: 1, username: 'test' });
      (authApi.getProfile as jest.Mock).mockRejectedValue(new Error('Invalid token'));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(tokenStorage.clear).toHaveBeenCalled();
    });
  });

  describe('signin', () => {
    it('successfully signs in user', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      const mockResponse = {
        accessToken: 'mock-token',
        user: mockUser,
      };
      (authApi.signin as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.signin({ username: 'testuser', password: 'password123' });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.error).toBeNull();
    });

    it('handles signin error', async () => {
      const errorMessage = 'Invalid credentials';
      (authApi.signin as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(result.current.signin({ username: 'testuser', password: 'wrong' })).rejects.toThrow(errorMessage);

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('signup', () => {
    it('successfully signs up user', async () => {
      const mockUser = { id: 1, username: 'newuser' };
      const mockResponse = {
        accessToken: 'mock-token',
        user: mockUser,
      };
      (authApi.signup as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.signup({ username: 'newuser', password: 'password123' });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.error).toBeNull();
    });

    it('handles signup error', async () => {
      const errorMessage = 'Username already taken';
      (authApi.signup as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(result.current.signup({ username: 'taken', password: 'password123' })).rejects.toThrow(errorMessage);

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('logout', () => {
    it('clears user state on logout', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      (tokenStorage.getToken as jest.Mock).mockReturnValue('mock-token');
      (tokenStorage.getUser as jest.Mock).mockReturnValue(mockUser);
      (authApi.getProfile as jest.Mock).mockResolvedValue({ user: mockUser });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });

      result.current.logout();

      await waitFor(() => {
        expect(result.current.user).toBeNull();
      });

      expect(authApi.logout).toHaveBeenCalled();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('clearError', () => {
    it('clears error state', async () => {
      (authApi.signin as jest.Mock).mockRejectedValue(new Error('Test error'));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(result.current.signin({ username: 'test', password: 'wrong' })).rejects.toThrow();

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      result.current.clearError();

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });
  });
});
