import { normalizeUsername, trimString } from './normalize-username.helper';

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

describe('trimString', () => {
  describe('string inputs', () => {
    it('should trim whitespace from string', () => {
      expect(trimString('  password  ')).toBe('password');
    });

    it('should trim leading whitespace', () => {
      expect(trimString('   password')).toBe('password');
    });

    it('should trim trailing whitespace', () => {
      expect(trimString('password   ')).toBe('password');
    });

    it('should preserve case', () => {
      expect(trimString('PassWord')).toBe('PassWord');
    });

    it('should handle empty string', () => {
      expect(trimString('')).toBe('');
    });

    it('should handle string with only whitespace', () => {
      expect(trimString('   ')).toBe('');
    });

    it('should handle string with tabs and newlines', () => {
      expect(trimString('\t\nPassword\n\t')).toBe('Password');
    });

    it('should preserve internal whitespace', () => {
      expect(trimString('  my password  ')).toBe('my password');
    });
  });

  describe('non-string inputs', () => {
    it('should return null as is', () => {
      expect(trimString(null)).toBeNull();
    });

    it('should return undefined as is', () => {
      expect(trimString(undefined)).toBeUndefined();
    });

    it('should return number as is', () => {
      expect(trimString(123)).toBe(123);
    });

    it('should return boolean as is', () => {
      expect(trimString(true)).toBe(true);
    });

    it('should return object as is', () => {
      const obj = { value: 'test' };
      expect(trimString(obj)).toBe(obj);
    });
  });

  describe('immutability', () => {
    it('should not modify original string', () => {
      const original = '  MyPassword  ';
      const result = trimString(original);
      expect(original).toBe('  MyPassword  ');
      expect(result).toBe('MyPassword');
    });
  });
});
