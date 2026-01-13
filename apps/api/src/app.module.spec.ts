import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppModule } from './app.module';
import { PlayerModule } from './player/player.module';
import { RankingModule } from './ranking/ranking.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  describe('Module initialization', () => {
    it('should compile successfully', () => {
      expect(module).toBeDefined();
    });

    it('should have AppModule defined', () => {
      const appModule = module.get(AppModule);
      expect(appModule).toBeDefined();
    });
  });

  describe('Module imports', () => {
    it('should import ConfigModule globally', () => {
      const configModule = module.get(ConfigModule);
      expect(configModule).toBeDefined();
    });

    it('should import ServeStaticModule', () => {
      const serveStaticModule = module.get(ServeStaticModule);
      expect(serveStaticModule).toBeDefined();
    });

    it('should import PlayerModule', () => {
      const playerModule = module.get(PlayerModule);
      expect(playerModule).toBeDefined();
    });

    it('should import RankingModule', () => {
      const rankingModule = module.get(RankingModule);
      expect(rankingModule).toBeDefined();
    });

    it('should import AuthModule', () => {
      const authModule = module.get(AuthModule);
      expect(authModule).toBeDefined();
    });

    it('should import UserModule', () => {
      const userModule = module.get(UserModule);
      expect(userModule).toBeDefined();
    });
  });
});
