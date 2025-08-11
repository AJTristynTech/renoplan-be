import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const workAreas = pgTable('work_areas', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  scope_type: varchar({ length: 255 }).notNull(), // 'interior', 'exterior'
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type WorkArea = typeof workAreas.$inferSelect;
export type NewWorkArea = typeof workAreas.$inferInsert;
