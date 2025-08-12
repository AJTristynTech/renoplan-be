import { NewTrade, Trade } from '@/src/db/schema/trades';

export default interface ITradeContractDao {
  findAll(limit?: number, offset?: number): Promise<Trade[]>;
  findByID(id: number): Promise<Trade | undefined>;
  create(trade: NewTrade): Promise<Trade>;
  update(id: number, data: Partial<Trade>): Promise<Trade | undefined>;
}
