import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { initializeE2eApp, cleanupE2eApp } from './helpers/e2e-setup';
import { faker } from '@faker-js/faker';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initializeE2eApp({
      useValidationPipe: true,
      setApiPrefix: true,
    });
  });

  afterEach(async () => {
    await cleanupE2eApp(app);
  });

  describe('/auth/signup (POST)', () => {
    it('should successfully register a new user', async () => {
      const uniqueUsername = faker.internet.username().slice(0, 10);
      const signupDto = {
        username: uniqueUsername,
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should fail with validation error when username already exists', async () => {
      const uniqueUsername = faker.internet.username().slice(0, 10);
      const signupDto = {
        username: uniqueUsername,
        password: 'password123',
      };

      await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto)
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');

      expect(response.body.message[0]).toContain('already exists');
    });

    it('should fail when username is too short', async () => {
      const signupDto = {
        username: 'ab',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');

      expect(response.body.message).toContain(
        'username must be longer than or equal to 3 characters',
      );
    });

    it('should fail when password is too short', async () => {
      const signupDto = {
        username: 'validuser',
        password: 'short',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');

      expect(response.body.message).toContain(
        'password must be longer than or equal to 8 characters',
      );
    });

    it('should fail when username is missing', async () => {
      const signupDto = {
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.message).toContain('username should not be empty');
    });

    it('should fail when password is missing', async () => {
      const signupDto = {
        username: 'testuser',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.message).toContain('password should not be empty');
    });

    it('should normalize username by trimming and lowercasing', async () => {
      const uniqueUsername = faker.internet.username().slice(0, 10);
      const signupDto = {
        username: `  ${uniqueUsername.toUpperCase()}  `,
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(201);
      expect(response.body.user.username).toStrictEqual(
        uniqueUsername.toLowerCase(),
      );
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should normalize password by trimming', async () => {
      const uniqueUsername = faker.internet.username().slice(0, 10);
      const signupDto = {
        username: uniqueUsername,
        password: '  Passw0rd!  ',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should fail when username exceeds max length', async () => {
      const signupDto = {
        username: 'a'.repeat(11),
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');

      expect(response.body.message).toContain(
        'username must be shorter than or equal to 10 characters',
      );
    });

    it('should fail when password is empty string', async () => {
      const signupDto = {
        username: 'validuser',
        password: '',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');

      expect(response.body.message).toContain('password should not be empty');
    });

    it('should fail when password is whitespace only', async () => {
      const signupDto = {
        username: 'validuser',
        password: '   ',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send(signupDto);

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.message).toContain('password should not be empty');
    });
  });

  describe('/auth/signin (POST)', () => {
    it('should successfully sign in an existing user', async () => {
      const uniqueUsername = faker.internet.username().slice(0, 10);
      const password = 'password123';

      await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send({ username: uniqueUsername, password })
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/api/auth/signin')
        .send({ username: uniqueUsername, password });

      expect(response.status).toStrictEqual(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should fail when credentials are invalid', async () => {
      const signinDto = {
        username: 'noexist',
        password: 'wrongpassword',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/signin')
        .send(signinDto);

      expect(response.status).toStrictEqual(401);
      expect(response.body.statusCode).toStrictEqual(401);
      expect(response.body.error).toStrictEqual('Unauthorized');
      expect(response.body.message).toStrictEqual('Invalid credentials');
    });

    it('should normalize username and password on signin', async () => {
      const uniqueUsername = faker.internet.username().slice(0, 10);
      const password = 'password123';

      await request(app.getHttpServer())
        .post('/api/auth/signup')
        .send({ username: uniqueUsername, password })
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/api/auth/signin')
        .send({
          username: `  ${uniqueUsername.toUpperCase()}  `,
          password: `  ${password}  `,
        });

      expect(response.status).toStrictEqual(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should fail signin when password is too short', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/signin')
        .send({ username: 'validuser', password: 'short' });

      expect(response.status).toStrictEqual(400);
      expect(response.body.statusCode).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');

      expect(response.body.message).toContain(
        'password must be longer than or equal to 8 characters',
      );
    });
  });
});
