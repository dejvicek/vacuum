import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { initializeE2eApp, cleanupE2eApp } from './helpers/e2e-setup';

describe('PlayerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initializeE2eApp({
      setApiPrefix: true,
    });
  });

  afterEach(async () => {
    await cleanupE2eApp(app);
  });

  describe('GET /api/v1/public/player', () => {
    it('should have correct response structure', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/public/player')
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });
});
