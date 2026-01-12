import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_DB_URL,
});

const db = drizzle(pool);

if (process.env.NODE_ENV === 'test') {
  process.on('exit', () => {
    pool.end();
  });
}

export { db };
