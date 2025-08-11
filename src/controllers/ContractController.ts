import { Request, Response } from 'express';
import IContractService from '../services/contracts/IContractService';
import ContractService from '../services/implementations/ContractService';
import { logger } from '../configs/logger';
import httpStatus from 'http-status';

export default class ContractController {
  private contractService: IContractService;

  constructor() {
    this.contractService = new ContractService();
  }

  createContract = async (req: Request, res: Response) => {
    try {
      const contract = await this.contractService.createContract(req.body);

      const { message, data, status } = contract.response;
      const code = contract.statusCode;

      res.status(contract.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  getContractByProjectId = async (req: Request, res: Response) => {
    try {
      const contract = await this.contractService.getContractByProjectId(
        Number(req.params.projectId),
      );
      const { message, data, status } = contract.response;
      const code = contract.statusCode;

      res.status(contract.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  getContractById = async (req: Request, res: Response) => {
    try {
      const contract = await this.contractService.getContractById(
        Number(req.params.id),
      );
      const { message, data, status } = contract.response;
      const code = contract.statusCode;

      res.status(contract.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  updateContract = async (req: Request, res: Response) => {
    try {
      const contract = await this.contractService.updateContract(
        Number(req.params.id),
        req.body,
      );
      const { message, data, status } = contract.response;
      const code = contract.statusCode;

      res.status(contract.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };
}
