import AuthService from '@/src/services/implementations/AuthService';
import UserService from '../services/implementations/UserService';
import { userDao } from '../dao';
import { Request, Response } from 'express';
import { ApiServiceResponse } from '../types/apiServiceResponse';
import { logger } from '../configs/logger';
import httpStatus from 'http-status';

export default class AuthConroller {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const user: ApiServiceResponse = await this.userService.createUser(
        req.body,
      );
      const { status } = user.response;

      const { message, data } = user.response;

      res.status(user.statusCode).json({ status, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  checkEmail = async (req: Request, res: Response) => {
    try {
      const isExists = await this.userService.isEmailExists(
        req.body.email.toLowerCase(),
      );
      res.status(isExists.statusCode).send(isExists.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await this.authService.login(email.toLowerCase());
      const { message, data, status } = user.response;
      const code = user.statusCode;
      res.status(user.statusCode).send({ status, code, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}
