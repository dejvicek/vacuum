import { config } from 'dotenv';
import { resolve } from 'node:path';

const envPath = resolve(__dirname, '.env.test');
config({ path: envPath });
