import { tokenStorage } from './token-storage';

describe('tokenStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('token management', () => {
    it('stores and retrieves token', () => {
      tokenStorage.setToken('test-token');
      expect(tokenStorage.getToken()).toBe('test-token');
    });

    it('returns null when no token exists', () => {
      expect(tokenStorage.getToken()).toBeNull();
    });

    it('removes token', () => {
      tokenStorage.setToken('test-token');
      tokenStorage.removeToken();
      expect(tokenStorage.getToken()).toBeNull();
    });
  });

  describe('user management', () => {
    it('stores and retrieves user', () => {
      const user = { id: 1, username: 'testuser' };
      tokenStorage.setUser(user);
      expect(tokenStorage.getUser()).toEqual(user);
    });

    it('returns null when no user exists', () => {
      expect(tokenStorage.getUser()).toBeNull();
    });

    it('removes user', () => {
      tokenStorage.setUser({ id: 1, username: 'testuser' });
      tokenStorage.removeUser();
      expect(tokenStorage.getUser()).toBeNull();
    });
  });

  describe('clear', () => {
    it('removes both token and user', () => {
      tokenStorage.setToken('test-token');
      tokenStorage.setUser({ id: 1, username: 'testuser' });

      tokenStorage.clear();

      expect(tokenStorage.getToken()).toBeNull();
      expect(tokenStorage.getUser()).toBeNull();
    });
  });
});
