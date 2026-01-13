import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { initializeE2eApp, cleanupE2eApp } from './helpers/e2e-setup';
import { db } from '../src/db';
import { playersTable } from '../src/db/schema';
import { sql } from 'drizzle-orm';

describe('PlayerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initializeE2eApp({
      setApiPrefix: true,
      useValidationPipe: true,
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

  describe('POST /api/v1/player', () => {
    it('should create a new player', async () => {
      const playerData = {
        nick_name: 'new_player_e2e',
        first_name: 'New',
        last_name: 'Player',
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/player')
        .send(playerData)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          nick_name: playerData.nick_name,
          first_name: playerData.first_name,
          last_name: playerData.last_name,
          created_at: expect.any(String),
        }),
      );

      // Verify it's actually in the database
      const dbPlayers = await db
        .select()
        .from(playersTable)
        .where(sql`nick_name = ${playerData.nick_name}`);
      expect(dbPlayers.length).toBe(1);
      expect(dbPlayers[0].nick_name).toBe(playerData.nick_name);
    });

    it('should return 400 when nick_name is missing', async () => {
      const playerData = {
        first_name: 'No',
        last_name: 'Nick',
      };

      await request(app.getHttpServer())
        .post('/api/v1/player')
        .send(playerData)
        .expect(400);
    });

    it('should allow null first_name and last_name', async () => {
      const playerData = {
        nick_name: 'minimal_player',
        first_name: null,
        last_name: null,
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/player')
        .send(playerData)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          nick_name: 'minimal_player',
          first_name: null,
          last_name: null,
        }),
      );
    });
  });
});
