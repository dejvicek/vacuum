import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 10 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const playersTable = pgTable('players', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  nickname: varchar({ length: 255 }).notNull().unique(),
});
