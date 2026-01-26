import { trimString } from './trim-string.util';

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
