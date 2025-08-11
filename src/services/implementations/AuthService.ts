import IUserDao from '@/src/dao/contracts/IUserDao';
import { userDao } from '../../dao/index';
import { NewUser, User } from '@/src/db/schema/user';
import httpStatus from 'http-status';
import { logger } from '@/src/configs/logger';
import * as jose from 'jose';
import { generateAccessToken } from '@/src/helpers/GenerateToken';
import IAuthService from '../contracts/IAuthService';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';
export default class AuthService implements IAuthService {
  private userDao: IUserDao;

  constructor() {
    this.userDao = userDao;
  }

  async login(idToken: string): Promise<ApiServiceResponse> {
    try {
      const decodedToken = jose.decodeJwt(idToken) as Record<string, string>;

      const user = await this.userDao.findByFirebaseUid(decodedToken.sub);

      if (!user) {
        const newUser = await this.register({
          firebase_uid: decodedToken.sub,
          email: decodedToken.email,
          displayName: decodedToken.name,
          user_type: 'user',
        });

        const accessToken = await generateAccessToken(
          newUser.response.data as User,
        );

        return {
          statusCode: httpStatus.CREATED,
          response: {
            status: true,
            code: httpStatus.CREATED,
            message: 'User not found, creating new user',
            data: {
              accessToken,
              user: newUser.response.data,
            },
          },
        };
      }

      const accessToken = await generateAccessToken(user);

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Login successful',
          data: {
            accessToken,
            user,
          },
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

  async register(user: NewUser): Promise<ApiServiceResponse> {
    const existingUser = await this.userDao.findByEmail(user.email);

    if (existingUser) {
      return {
        statusCode: httpStatus.BAD_REQUEST,
        response: {
          status: false,
          code: httpStatus.BAD_REQUEST,
          message: 'User already exists',
          data: [],
        },
      };
    }

    const newUser = await this.userDao.create(user);

    if (!newUser) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create user',
          data: [],
        },
      };
    }

    return {
      statusCode: httpStatus.CREATED,
      response: {
        status: true,
        code: httpStatus.CREATED,
        message: 'User created successfully',
        data: newUser,
      },
    };
  }
}
