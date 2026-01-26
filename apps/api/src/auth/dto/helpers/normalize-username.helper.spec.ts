import { normalizeUsername } from './normalize-username.helper';

describe('normalizeUsername', () => {
  describe('string inputs', () => {
    it('should trim and lowercase a simple string', () => {
      expect(normalizeUsername('  JohnDoe  ')).toBe('johndoe');
    });

    it('should convert uppercase to lowercase', () => {
      expect(normalizeUsername('ADMIN')).toBe('admin');
    });

    it('should trim leading whitespace', () => {
      expect(normalizeUsername('   user')).toBe('user');
    });

    it('should trim trailing whitespace', () => {
      expect(normalizeUsername('user   ')).toBe('user');
    });

    it('should handle mixed case strings', () => {
      expect(normalizeUsername('JoHnDoE')).toBe('johndoe');
    });

    it('should handle empty string', () => {
      expect(normalizeUsername('')).toBe('');
    });

    it('should handle string with only whitespace', () => {
      expect(normalizeUsername('   ')).toBe('');
    });

    it('should handle string with tabs and newlines', () => {
      expect(normalizeUsername('\t\nUsername\n\t')).toBe('username');
    });

    it('should handle unicode characters', () => {
      expect(normalizeUsername('  Üšër  ')).toBe('üšër');
    });

    it('should preserve numbers in string', () => {
      expect(normalizeUsername('User123')).toBe('user123');
    });

    it('should preserve special characters', () => {
      expect(normalizeUsername('User_Name-123')).toBe('user_name-123');
    });
  });

  describe('non-string inputs', () => {
    it('should return null as is', () => {
      expect(normalizeUsername(null)).toBeNull();
    });

    it('should return undefined as is', () => {
      expect(normalizeUsername(undefined)).toBeUndefined();
    });

    it('should return number as is', () => {
      expect(normalizeUsername(123)).toBe(123);
    });

    it('should return boolean as is', () => {
      expect(normalizeUsername(true)).toBe(true);
      expect(normalizeUsername(false)).toBe(false);
    });

    it('should return object as is', () => {
      const obj = { name: 'test' };
      expect(normalizeUsername(obj)).toBe(obj);
    });

    it('should return array as is', () => {
      const arr = [1, 2, 3];
      expect(normalizeUsername(arr)).toBe(arr);
    });
  });

  describe('immutability', () => {
    it('should not modify original string', () => {
      const original = '  TestUser  ';
      const result = normalizeUsername(original);
      expect(original).toBe('  TestUser  ');
      expect(result).toBe('testuser');
    });
  });
});
