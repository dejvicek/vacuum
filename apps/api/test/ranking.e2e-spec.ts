import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { initializeE2eApp, cleanupE2eApp } from './helpers/e2e-setup';

describe('RankingController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initializeE2eApp({
      setApiPrefix: true,
    });
  });

  afterEach(async () => {
    await cleanupE2eApp(app);
  });

  describe('GET /api/v1/public/ranking', () => {
    it('should return an array of rankings with valid dates', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/public/ranking')
        .query({ fromDate: '2024-09-30', toDate: '2024-12-31' })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('should reject request when fromDate is missing', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/public/ranking')
        .query({ toDate: '2024-12-31' })
        .expect(400);
    });

    it('should reject request when toDate is missing', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/public/ranking')
        .query({ fromDate: '2024-09-30' })
        .expect(400);
    });

    it('should reject request when fromDate is not a valid date', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/public/ranking')
        .query({ fromDate: 'invalid-date', toDate: '2024-12-31' })
        .expect(400);
    });

    it('should reject request when toDate is not a valid date', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/public/ranking')
        .query({ fromDate: '2024-09-30', toDate: 'invalid-date' })
        .expect(400);
    });

    it('should reject request when toDate is less than fromDate', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/public/ranking')
        .query({ fromDate: '2024-12-31', toDate: '2024-09-30' })
        .expect(400);
    });

    it('should accept request when toDate equals fromDate', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/public/ranking')
        .query({ fromDate: '2024-09-30', toDate: '2024-09-30' })
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });
});
