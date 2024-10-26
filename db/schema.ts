import { integer, pgTable, serial, text, json } from 'drizzle-orm/pg-core';

// Users Table Definition
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

// App Config Table Definition
export const appConfigTable = pgTable('app_config_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  config: json('config').notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertAppConfig = typeof appConfigTable.$inferInsert;
export type SelectAppConfig = typeof appConfigTable.$inferSelect;
