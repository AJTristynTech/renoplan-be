import { Request, Response } from 'express';
import TradeContractService from '../services/implementations/TradeContractService';
import { logger } from '../configs/logger';
import httpStatus from 'http-status';

export default class TradeContractController {
  private tradeContractService: TradeContractService;

  constructor() {
    this.tradeContractService = new TradeContractService();
  }

  getTradeContracts = async (req: Request, res: Response) => {
    try {
      const { limit, offset } = req.query;
      const trades = await this.tradeContractService.getTradeContract(
        Number(limit),
        Number(offset),
      );

      const { message, data, status } = trades.response;
      const code = trades.statusCode;

      res.status(trades.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  getTradeById = async (req: Request, res: Response) => {
    try {
      const tradeContractId = Number(req.params.id);

      const trade =
        await this.tradeContractService.getTradeById(tradeContractId);

      const { message, data, status } = trade.response;
      const code = trade.statusCode;

      res.status(trade.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  createTradeContract = async (req: Request, res: Response) => {
    try {
      const newTrade = await this.tradeContractService.createTrade(req.body);

      const { message, data, status } = newTrade.response;
      const code = newTrade.statusCode;

      res.status(newTrade.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  updateTradeContract = async (req: Request, res: Response) => {
    try {
      const tradeContractId = Number(req.params.id);
      const updatedTrade = await this.tradeContractService.updateTrade(
        tradeContractId,
        req.body,
      );

      const { message, data, status } = updatedTrade.response;
      const code = updatedTrade.statusCode;

      res.status(updatedTrade.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };
}
