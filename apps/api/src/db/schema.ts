import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

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
