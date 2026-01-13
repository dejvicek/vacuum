import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { initializeE2eApp, cleanupE2eApp } from './helpers/e2e-setup';
import { db } from '../src/db';
import { playersTable } from '../src/db/schema';

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
      await db.insert(playersTable).values([
        {
          nick_name: 'john_doe',
          first_name: 'John',
          last_name: 'Doe',
        },
        {
          nick_name: 'kuba',
          first_name: 'Jakub',
          last_name: 'Novák',
        },
      ]);

      const response = await request(app.getHttpServer())
        .get('/api/v1/public/player')
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            nick_name: 'john_doe',
            first_name: 'John',
            last_name: 'Doe',
            created_at: expect.any(String),
          }),
          expect.objectContaining({
            id: expect.any(Number),
            nick_name: 'kuba',
            first_name: 'Jakub',
            last_name: 'Novák',
            created_at: expect.any(String),
          }),
        ]),
      );
    });
  });
});
