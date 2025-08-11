import { integer, pgTable } from 'drizzle-orm/pg-core';
import { trades } from './trades';
import { workAreas } from './work-areas';

export const workAreaTrade = pgTable('work_area_trade', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  work_area_id: integer().references(() => workAreas.id),
  trade_id: integer().references(() => trades.id),
});

export type WorkAreaTrade = typeof workAreaTrade.$inferSelect;
export type NewWorkAreaTrade = typeof workAreaTrade.$inferInsert;
