import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import { User } from '../db/schema/user';
import { logger } from '../configs/logger';
import httpStatus from 'http-status';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });
    }

    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    req.user = decoded.payload as User;

    next();
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.BAD_GATEWAY).send(error);
  }
};
