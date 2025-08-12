import { NewTrade, Trade, trades } from '@/src/db/schema/trades';
import SuperDao from './SuperDao';
import ITradeContractDao from '../contracts/ITradeContract';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { logger } from '@/src/configs/logger';
import { eq } from 'drizzle-orm';

export default class TradeContractDao
  extends SuperDao<Trade, NewTrade>
  implements ITradeContractDao
{
  constructor(db: NodePgDatabase) {
    super(db, trades);
  }

  async findAll(limit = 10, offset = 0): Promise<Trade[]> {
    try {
      const result = await this.db
        .select()
        .from(trades)
        .limit(limit)
        .offset(offset);
      return result as Trade[];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findByID(id: number): Promise<Trade | undefined> {
    try {
      const result = await this.db
        .select()
        .from(trades)
        .where(eq(trades.id, id))
        .limit(1);
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async create(trade: NewTrade): Promise<Trade> {
    try {
      const result = await this.db.insert(trades).values(trade).returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async update(id: number, data: Partial<Trade>): Promise<Trade | undefined> {
    try {
      const result = await this.db
        .update(trades)
        .set(data)
        .where(eq(trades.id, id))
        .returning();
      return result[0] as Trade;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
