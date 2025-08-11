import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './user';

export const projectType = pgEnum('project_type', [
  'home improvement',
  'renovation',
  'new construction',
  'other',
]);

export const projects = pgTable('projects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().references(() => users.id),
  title: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  project_type: projectType('project_type').notNull(), // home improvement, renovation, new construction, other
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
