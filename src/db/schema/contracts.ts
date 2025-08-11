import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { projects } from './project';

export const contracts = pgTable('contracts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  project_id: integer().references(() => projects.id),
  status: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type Contract = typeof contracts.$inferSelect;
export type NewContract = typeof contracts.$inferInsert;
