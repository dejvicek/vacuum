import {
  integer,
  pgTable,
  timestamp,
  varchar,
  numeric,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 10 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const playersTable = pgTable('player', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nick_name: varchar({ length: 255 }).notNull().unique(),
  first_name: varchar({ length: 255 }),
  last_name: varchar({ length: 255 }),
});

export const rankingsTable = pgTable('rankings', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  player_id: integer()
    .notNull()
    .references(() => playersTable.id),
  nick_name: varchar({ length: 255 }),
  first_name: varchar({ length: 255 }),
  last_name: varchar({ length: 255 }),
  total_score: numeric({ precision: 10, scale: 2 }),
  total_victories: integer(),
  total_defeats: integer(),
  total_matches: integer(),
  win_rate: numeric({ precision: 5, scale: 2 }),
  average_score: numeric({ precision: 10, scale: 2 }),
  created_at: timestamp().defaultNow(),
});

export const getRankingsBetweenDates = (fromDate: string, toDate: string) =>
  sql`SELECT * FROM get_rankings_between_dates(${fromDate}, ${toDate})`;
