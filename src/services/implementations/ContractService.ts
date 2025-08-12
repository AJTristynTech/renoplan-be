import IContractDao from '@/src/dao/contracts/IContractDao';
import IContractService from '../contracts/IContractService';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';
import { Contract, NewContract } from '@/src/db/schema/contracts';
import httpStatus from 'http-status';
import { logger } from '@/src/configs/logger';
import { contractDao } from '@/src/dao';

export default class ContractService implements IContractService {
  private contractDao: IContractDao;

  constructor() {
    this.contractDao = contractDao;
  }

  async createContract(contract: NewContract): Promise<ApiServiceResponse> {
    try {
      const newContract = await this.contractDao.create(contract);
      return {
        statusCode: httpStatus.CREATED,
        response: {
          status: true,
          code: httpStatus.CREATED,
          message: 'Contract created successfully',
          data: newContract,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create contract' + error,
          data: [],
        },
      };
    }
  }

  async getContractByProjectId(projectId: number): Promise<ApiServiceResponse> {
    try {
      const contract = await this.contractDao.findByProjectId(projectId);

      if (!contract) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'Contract not found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Contract found',
          data: contract,
        },
      };
    } catch (error) {
      logger.error(error);
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to get contract by project id' + error,
          data: [],
        },
      };
    }
  }

  async getContractById(id: number): Promise<ApiServiceResponse> {
    try {
      const contract = await this.contractDao.findByID(id);

      if (!contract) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'Contract not found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Contract found',
          data: contract,
        },
      };
    } catch (error) {
      logger.error(error);
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to get contract by id' + error,
          data: [],
        },
      };
    }
  }

  async updateContract(
    id: number,
    data: Partial<Contract>,
  ): Promise<ApiServiceResponse> {
    try {
      const contract = await this.contractDao.update(id, data);

      if (!contract) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'Contract not found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Contract updated successfully',
          data: contract,
        },
      };
    } catch (error) {
      logger.error(error);
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update contract' + error,
          data: [],
        },
      };
    }
  }
}
