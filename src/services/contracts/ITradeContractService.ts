import { NewTrade, Trade } from '@/src/db/schema/trades';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';

export default interface ITradeContractService {
  getTradeContract(
    limit?: number,
    offset?: number,
  ): Promise<ApiServiceResponse>;
  getTradeById(id: number): Promise<ApiServiceResponse>;
  createTrade(trade: NewTrade): Promise<ApiServiceResponse>;
  updateTrade(id: number, data: Partial<Trade>): Promise<ApiServiceResponse>;
}
