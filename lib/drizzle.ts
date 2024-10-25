import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  json,
} from 'drizzle-orm/pg-core'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

// Users Table Definition
export const UsersTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    }
  }
)

export type User = InferSelectModel<typeof UsersTable>
export type NewUser = InferInsertModel<typeof UsersTable>

// App Config Table Definition
export const AppConfigTable = pgTable(
  'app_config',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    value: json('value').notNull(),  // JSON type for the value
  },
  (appConfig) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(appConfig.title), // Ensure title is unique
    }
  }
)

export type AppConfig = InferSelectModel<typeof AppConfigTable>
export type NewAppConfig = InferInsertModel<typeof AppConfigTable>

// Connect to Vercel Postgres
export const db = drizzle(sql)
