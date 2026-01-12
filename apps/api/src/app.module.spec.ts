import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

  describe('Controllers', () => {
    it('should provide AppController', () => {
      const controller = module.get<AppController>(AppController);
      expect(controller).toBeDefined();
      expect(controller).toBeInstanceOf(AppController);
    });
  });

  describe('Providers', () => {
    it('should provide AppService', () => {
      const service = module.get<AppService>(AppService);
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(AppService);
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

  describe('Dependency injection', () => {
    it('should inject AppService into AppController', () => {
      const controller = module.get<AppController>(AppController);
      const service = module.get<AppService>(AppService);

      expect(controller).toBeDefined();
      expect(service).toBeDefined();
      expect(controller['appService']).toBe(service);
    });
  });
});
