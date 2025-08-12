import { Request, Response } from 'express';
import WorkAreaService from '../services/implementations/WorkAreaService';
import { logger } from '../configs/logger';
import httpStatus from 'http-status';

export default class WorkAreaController {
  private workAreaService: WorkAreaService;

  constructor() {
    this.workAreaService = new WorkAreaService();
  }

  getWorkAreas = async (req: Request, res: Response) => {
    try {
      const { limit, offset } = req.query;
      const workAreas = await this.workAreaService.getWorkAreas(
        Number(limit),
        Number(offset),
      );

      const { message, data, status } = workAreas.response;
      const code = workAreas.statusCode;

      res.status(workAreas.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  getWorkAreasByScopeType = async (req: Request, res: Response) => {
    try {
      const { scopeType } = req.params;
      const workAreas =
        await this.workAreaService.getWorkAreasByScopeType(scopeType);

      const { message, data, status } = workAreas.response;
      const code = workAreas.statusCode;

      res.status(workAreas.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  getWorkAreaById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const workArea = await this.workAreaService.getWorkAreaById(Number(id));

      const { message, data, status } = workArea.response;
      const code = workArea.statusCode;

      res.status(workArea.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  createWorkArea = async (req: Request, res: Response) => {
    try {
      const workArea = await this.workAreaService.createWorkArea(req.body);

      const { message, data, status } = workArea.response;
      const code = workArea.statusCode;

      res.status(workArea.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  updateWorkArea = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const workArea = await this.workAreaService.updateWorkArea(
        Number(id),
        req.body,
      );

      const { message, data, status } = workArea.response;
      const code = workArea.statusCode;

      res.status(workArea.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  addTradesToWorkArea = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { tradeIds } = req.body;

      const trades = await this.workAreaService.addTradesToWorkArea(
        Number(id),
        tradeIds,
      );

      const { message, data, status } = trades.response;
      const code = trades.statusCode;

      res.status(trades.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  getTradesForWorkArea = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const trades = await this.workAreaService.getTradesForWorkArea(
        Number(id),
      );

      const { message, data, status } = trades.response;
      const code = trades.statusCode;

      res.status(trades.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };
}
