import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { useContainer } from 'class-validator';
import { reset } from 'drizzle-seed';
import { db } from '../../src/db';
import * as schema from '../../src/db/schema';

interface E2eAppOptions {
  useValidationPipe?: boolean;
  setApiPrefix?: boolean;
}

export async function initializeE2eApp(
  options: E2eAppOptions = {},
): Promise<INestApplication> {
  const { useValidationPipe = false, setApiPrefix = false } = options;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  if (useValidationPipe) {
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  }

  if (setApiPrefix) {
    app.setGlobalPrefix('api/v1');
  }

  await app.init();

  return app;
}

export async function cleanupE2eApp(app: INestApplication): Promise<void> {
  await reset(db, schema);
  await app.close();
}
