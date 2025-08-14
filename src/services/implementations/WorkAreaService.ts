import IWorkAreaDao from '@/src/dao/contracts/IWorkAreaDao';
import IWorkAreaService from '../contracts/IWorkAreaService';
import { tradeContractDao, workAreaDao } from '@/src/dao';
import { NewWorkArea, WorkArea } from '@/src/db/schema/work-areas';
import httpStatus from 'http-status';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';
import ITradeContractDao from '@/src/dao/contracts/ITradeContract';

export default class WorkAreaService implements IWorkAreaService {
  private workAreaDao: IWorkAreaDao;
  private tradeDao: ITradeContractDao;

  constructor() {
    this.workAreaDao = workAreaDao;
    this.tradeDao = tradeContractDao;
  }

  async getWorkAreas(
    limit: number,
    offset: number,
  ): Promise<ApiServiceResponse> {
    try {
      const workAreas = await this.workAreaDao.getWorkAreas(limit, offset);

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Work areas fetched successfully',
          data: workAreas,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch work areas',
          data: [],
        },
      };
    }
  }

  async getWorkAreasByScopeType(
    scopeType: string,
  ): Promise<ApiServiceResponse> {
    try {
      const workAreas =
        await this.workAreaDao.getWorkAreasByScopeType(scopeType);

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Work areas fetched successfully',
          data: workAreas,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch work areas',
          data: [],
        },
      };
    }
  }

  async getWorkAreaById(id: number): Promise<ApiServiceResponse> {
    try {
      const workArea = await this.workAreaDao.getWorkAreaById(id);

      if (!workArea) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'Work area not found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Work area fetched successfully',
          data: workArea,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch work area',
          data: [],
        },
      };
    }
  }

  async createWorkArea(workArea: NewWorkArea): Promise<ApiServiceResponse> {
    try {
      const newWorkArea = await this.workAreaDao.createWorkArea(workArea);

      return {
        statusCode: httpStatus.CREATED,
        response: {
          status: true,
          code: httpStatus.CREATED,
          message: 'Work area created successfully',
          data: newWorkArea,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create work area',
          data: [],
        },
      };
    }
  }

  async updateWorkArea(
    id: number,
    workArea: Partial<WorkArea>,
  ): Promise<ApiServiceResponse> {
    try {
      const updatedWorkArea = await this.workAreaDao.updateWorkArea(
        id,
        workArea,
      );

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Work area updated successfully',
          data: updatedWorkArea,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update work area',
          data: [],
        },
      };
    }
  }

  async addTradesToWorkArea(
    workAreaId: number,
    tradeIds: number[],
  ): Promise<ApiServiceResponse> {
    try {
      await this.workAreaDao.addTradesToWorkArea(workAreaId, tradeIds);

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Trades added to work area successfully',
          data: [],
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to add trades to work area',
          data: [],
        },
      };
    }
  }

  async getTradesForWorkArea(workAreaId: number): Promise<ApiServiceResponse> {
    try {
      const trades = await this.workAreaDao.getTradesForWorkArea(workAreaId);
      const workArea = await this.workAreaDao.getWorkAreaById(workAreaId);

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Trades fetched successfully',
          data: {
            trades,
            workArea: {
              id: workArea?.id,
              name: workArea?.name,
              description: workArea?.description,
              scopeType: workArea?.scope_type,
            },
          },
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch trades for work area',
          data: [],
        },
      };
    }
  }
}
