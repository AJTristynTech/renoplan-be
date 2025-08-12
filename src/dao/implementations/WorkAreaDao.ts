import { NewWorkArea, WorkArea, workAreas } from '@/src/db/schema/work-areas';
import SuperDao from './SuperDao';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import IWorkAreaDao from '../contracts/IWorkAreaDao';
import { logger } from '@/src/configs/logger';
import { eq } from 'drizzle-orm';
import { workAreaTrade } from '@/src/db/schema/work_area_trade';
import { Trade, trades } from '@/src/db/schema/trades';

export default class WorkAreaDao
  extends SuperDao<WorkArea, NewWorkArea>
  implements IWorkAreaDao
{
  constructor(db: NodePgDatabase) {
    super(db, workAreas);
  }

  async getWorkAreas(limit: number, offset: number): Promise<WorkArea[]> {
    try {
      const result = await this.db
        .select()
        .from(workAreas)
        .limit(limit)
        .offset(offset);
      return result as WorkArea[];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getWorkAreasByScopeType(scopeType: string): Promise<WorkArea[]> {
    try {
      const result = await this.db
        .select()
        .from(workAreas)
        .where(eq(workAreas.scope_type, scopeType));
      return result as WorkArea[];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getWorkAreaById(id: number): Promise<WorkArea | null> {
    try {
      const result = await this.db
        .select()
        .from(workAreas)
        .where(eq(workAreas.id, id))
        .limit(1);
      return result[0] as WorkArea | null;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createWorkArea(workArea: NewWorkArea): Promise<WorkArea> {
    try {
      const result = await this.db
        .insert(workAreas)
        .values(workArea)
        .returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateWorkArea(
    id: number,
    workArea: Partial<WorkArea>,
  ): Promise<WorkArea> {
    try {
      const result = await this.db
        .update(workAreas)
        .set(workArea)
        .where(eq(workAreas.id, id))
        .returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async addTradesToWorkArea(
    workAreaId: number,
    tradeIds: number[],
  ): Promise<void> {
    try {
      await this.db.insert(workAreaTrade).values(
        tradeIds.map((tradeId) => ({
          work_area_id: workAreaId,
          trade_id: tradeId,
        })),
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getTradesForWorkArea(workAreaId: number): Promise<Trade[]> {
    try {
      const result = await this.db
        .select({
          id: trades.id,
          name: trades.name,
          createdAt: trades.createdAt,
          updatedAt: trades.updatedAt,
        })
        .from(workAreaTrade)
        .where(eq(workAreaTrade.work_area_id, workAreaId))
        .innerJoin(trades, eq(workAreaTrade.trade_id, trades.id));
      return result as Trade[];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
