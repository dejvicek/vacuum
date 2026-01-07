import type { InferSelectModel } from 'drizzle-orm';
import { playersTable } from '../db/schema';

export type Player = InferSelectModel<typeof playersTable>;
