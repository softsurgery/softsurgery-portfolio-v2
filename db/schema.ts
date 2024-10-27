import { integer, pgTable, serial, text, json } from 'drizzle-orm/pg-core';

// Users Table Definition with Role ID
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  roleId: integer('role_id').references(() => rolesTable.id).notNull(),
});

// Roles Table Definition
export const rolesTable = pgTable('roles_table', {
  id: serial('id').primaryKey(),
  roleName: text('role_name').notNull().unique(),
});

// Permissions Table Definition
export const permissionsTable = pgTable('permissions_table', {
  id: serial('id').primaryKey(),
  permissionName: text('permission_name').notNull().unique(), 
});

// Role Permissions Join Table (Many-to-Many between roles and permissions)
export const rolePermissionsTable = pgTable('role_permissions_table', {
  roleId: integer('role_id').references(() => rolesTable.id).notNull(),
  permissionId: integer('permission_id').references(() => permissionsTable.id).notNull(),
});


// App Config Table Definition
export const appConfigTable = pgTable('app_config_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  config: json('config').notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertRole = typeof rolesTable.$inferInsert;
export type SelectRole = typeof rolesTable.$inferSelect;

export type InsertPermission = typeof permissionsTable.$inferInsert;
export type SelectPermission = typeof permissionsTable.$inferSelect;

export type InsertRolePermission = typeof rolePermissionsTable.$inferInsert;
export type SelectRolePermission = typeof rolePermissionsTable.$inferSelect;

export type InsertAppConfig = typeof appConfigTable.$inferInsert;
export type SelectAppConfig = typeof appConfigTable.$inferSelect;
