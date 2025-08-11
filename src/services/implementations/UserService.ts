import IUserDao from '@/src/dao/contracts/IUserDao';
import IUserService from '../contracts/IUserService';
import { NewUser } from '@/src/db/schema/user';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';
import httpStatus from 'http-status';
import { logger } from '@/src/configs/logger';
import UserDao from '@/src/dao/implementations/UserDao';
import { db } from '@/src/configs/db';

export default class UserService implements IUserService {
  private userDao: IUserDao;
  constructor() {
    this.userDao = new UserDao(db);
  }

  async createUser(user: NewUser): Promise<ApiServiceResponse> {
    try {
      const isEmailExists = await this.userDao.isEmailExists(user.email);

      if (isEmailExists) {
        return {
          statusCode: httpStatus.CONFLICT,
          response: {
            status: false,
            code: httpStatus.CONFLICT,
            message: 'Email already exists',
            data: [],
          },
        };
      }

      const newUser = await this.userDao.create(user);

      return {
        statusCode: httpStatus.CREATED,
        response: {
          status: true,
          code: httpStatus.CREATED,
          message: 'User created successfully',
          data: newUser,
        },
      };
    } catch (error) {
      logger.error(error);
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          data: [],
        },
      };
    }
  }

  async getUserById(id: number): Promise<ApiServiceResponse> {
    try {
      const user = await this.userDao.findById(id);

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'User found',
          data: user,
        },
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async isEmailExists(email: string): Promise<ApiServiceResponse> {
    try {
      const user = await this.userDao.findByEmail(email);
      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Email exists',
          data: user,
        },
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getByFirebaseUid(firebaseUid: string): Promise<ApiServiceResponse> {
    try {
      const user = await this.userDao.findByFirebaseUid(firebaseUid);

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'User found',
          data: user,
        },
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
