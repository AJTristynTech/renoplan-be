import {
  boolean,
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const workAreas = pgTable(
  'work_areas',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    scope_type: varchar({ length: 255 }).notNull(), // 'interior', 'exterior'
    is_active: boolean().notNull().default(true),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index('work_areas_name_idx').on(table.name),
    scopeTypeIdx: index('work_areas_scope_type_idx').on(table.scope_type),
    isActiveIdx: index('work_areas_is_active_idx').on(table.is_active),
  }),
);

export type WorkArea = typeof workAreas.$inferSelect;
export type NewWorkArea = typeof workAreas.$inferInsert;
