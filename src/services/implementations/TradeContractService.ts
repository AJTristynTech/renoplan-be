import ITradeContractDao from '@/src/dao/contracts/ITradeContract';
import ITradeContractService from '../contracts/ITradeContractService';
import { tradeContractDao } from '@/src/dao';
import { NewTrade, Trade } from '@/src/db/schema/trades';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';
import httpStatus from 'http-status';

export default class TradeContractService implements ITradeContractService {
  private tradeContractDao: ITradeContractDao;
  constructor() {
    this.tradeContractDao = tradeContractDao;
  }

  async getTradeContract(
    limit?: number,
    offset?: number,
  ): Promise<ApiServiceResponse> {
    try {
      const trades = await this.tradeContractDao.findAll(limit, offset);
      return {
        statusCode: httpStatus.OK,
        response: {
          pagination: {
            limit,
            offset,
            total: trades.length,
          },
          status: true,
          code: httpStatus.OK,
          message: 'Trades fetched successfully',
          data: trades,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch trades',
          data: [],
        },
      };
    }
  }

  async getTradeById(id: number): Promise<ApiServiceResponse> {
    try {
      const trade = await this.tradeContractDao.findByID(id);

      if (!trade) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'Trade not found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Trade fetched successfully',
          data: trade,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch trade',
          data: [],
        },
      };
    }
  }

  async createTrade(trade: NewTrade): Promise<ApiServiceResponse> {
    try {
      const newTrade = await this.tradeContractDao.create(trade);

      return {
        statusCode: httpStatus.CREATED,
        response: {
          status: true,
          code: httpStatus.CREATED,
          message: 'Trade created successfully',
          data: newTrade,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create trade',
          data: [],
        },
      };
    }
  }

  async updateTrade(
    id: number,
    data: Partial<Trade>,
  ): Promise<ApiServiceResponse> {
    try {
      const updatedTrade = await this.tradeContractDao.update(id, data);

      if (!updatedTrade) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'Trade not found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Trade updated successfully',
          data: updatedTrade,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update trade',
          data: [],
        },
      };
    }
  }
}
