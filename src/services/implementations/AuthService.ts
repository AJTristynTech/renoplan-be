import IUserDao from '@/src/dao/contracts/IUserDao';
import { userDao } from '../../dao/index';
import { NewUser, User } from '@/src/db/schema/user';
import httpStatus from 'http-status';
import { logger } from '@/src/configs/logger';
export default class AuthService {
  private userDao: IUserDao;

  constructor() {
    this.userDao = userDao;
  }

  async login(email: string) {
    try {
      const user = await this.userDao.findByEmail(email);

      if (!user) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'User not found',
            data: [],
          },
        };
      }

      if (user.user_type !== 'admin') {
        return {
          statusCode: httpStatus.UNAUTHORIZED,
          response: {
            status: false,
            code: httpStatus.UNAUTHORIZED,
            message: 'Invalid role',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Login successful',
          data: user,
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

  async register(user: NewUser): Promise<User> {
    const existingUser = await this.userDao.findByEmail(user.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await this.userDao.create(user);

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    return newUser;
  }
}
