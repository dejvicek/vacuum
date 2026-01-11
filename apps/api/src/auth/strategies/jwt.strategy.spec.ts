import { Test, TestingModule } from '@nestjs/testing';

import { JwtStrategy } from './jwt.strategy';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return the payload as is', () => {
      const payload: JwtPayloadDto = { sub: 1, username: 'testuser' };

      const result = jwtStrategy.validate(payload);

      expect(result).toStrictEqual(payload);
      expect(result.sub).toBe(1);
      expect(result.username).toBe('testuser');
    });
  });
});
