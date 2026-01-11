import { Test, TestingModule } from '@nestjs/testing';

import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  const originalEnv = process.env;

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('getJwtSecret', () => {
    it('should return JWT_SECRET when environment variable is set', () => {
      const result = AuthModule.getJwtSecret();

      expect(result).toBe('unit-test-secret-123');
    });

    it('should throw error when JWT_SECRET is not set', () => {
      delete process.env.JWT_SECRET;

      expect(() => AuthModule.getJwtSecret()).toThrow(
        'JWT_SECRET environment variable is not set',
      );
    });

    it('should throw error when JWT_SECRET is empty string', () => {
      process.env.JWT_SECRET = '';

      expect(() => AuthModule.getJwtSecret()).toThrow(
        'JWT_SECRET environment variable is not set',
      );
    });
  });

  describe('Module initialization', () => {
    it('should compile successfully when JWT_SECRET is set', async () => {
      process.env.JWT_SECRET = 'unit-test-secret-123';

      const module: TestingModule = await Test.createTestingModule({
        imports: [AuthModule],
      }).compile();

      expect(module).toBeDefined();
      expect(module.get(AuthModule)).toBeDefined();
    });
  });
});
