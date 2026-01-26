import { authApi, AuthApiError } from './index';
import { tokenStorage } from './token-storage';

jest.mock('./token-storage');

globalThis.fetch = jest.fn();

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (globalThis.fetch as jest.Mock).mockClear();
  });

  describe('signin', () => {
    it('successfully signs in and stores token', async () => {
      const mockResponse = {
        accessToken: 'test-token',
        user: { id: 1, username: 'testuser' },
      };

      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await authApi.signin({
        username: 'testuser',
        password: 'password123',
      });

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/public/auth/signin'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'testuser', password: 'password123' }),
        })
      );

      expect(tokenStorage.setToken).toHaveBeenCalledWith('test-token');
      expect(tokenStorage.setUser).toHaveBeenCalledWith(mockResponse.user);
      expect(result).toEqual(mockResponse);
    });

    it('throws error on failed signin', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Invalid credentials' }),
      });

      await expect(authApi.signin({ username: 'testuser', password: 'wrong' })).rejects.toThrow(AuthApiError);
    });
  });

  describe('signup', () => {
    it('successfully signs up and stores token', async () => {
      const mockResponse = {
        accessToken: 'test-token',
        user: { id: 1, username: 'newuser' },
      };

      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await authApi.signup({
        username: 'newuser',
        password: 'password123',
      });

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/public/auth/signup'),
        expect.objectContaining({
          method: 'POST',
        })
      );

      expect(tokenStorage.setToken).toHaveBeenCalledWith('test-token');
      expect(tokenStorage.setUser).toHaveBeenCalledWith(mockResponse.user);
      expect(result).toEqual(mockResponse);
    });

    it('throws error when username is taken', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Username already exists' }),
      });

      await expect(authApi.signup({ username: 'taken', password: 'password123' })).rejects.toThrow(AuthApiError);
    });
  });

  describe('getProfile', () => {
    it('fetches user profile with token', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      (tokenStorage.getToken as jest.Mock).mockReturnValue('test-token');
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ user: mockUser }),
      });

      const result = await authApi.getProfile();

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/public/auth/profile'),
        expect.objectContaining({
          method: 'GET',
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
          },
        })
      );

      expect(result).toEqual({ user: mockUser });
    });

    it('throws error when no token is present', async () => {
      (tokenStorage.getToken as jest.Mock).mockReturnValue(null);

      await expect(authApi.getProfile()).rejects.toThrow(AuthApiError);
      await expect(authApi.getProfile()).rejects.toThrow('No authentication token found');
    });

    it('throws error on unauthorized request', async () => {
      (tokenStorage.getToken as jest.Mock).mockReturnValue('invalid-token');
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Unauthorized' }),
      });

      await expect(authApi.getProfile()).rejects.toThrow(AuthApiError);
    });
  });

  describe('logout', () => {
    it('clears token storage', () => {
      authApi.logout();

      expect(tokenStorage.clear).toHaveBeenCalled();
    });
  });
});
