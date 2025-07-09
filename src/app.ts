import express, { Express, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import httpStatus from 'http-status';
import routes from './routes';

import ApiError from '@helpers/ApiError';

export const app: Express = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// passport.use('jwt')

app.get('/api/v1/test', async (req, res) => {
  res.status(200).send('WELCOME TO NODE TS DRIZZLE API DUMBSHIT');
});

app.use('/api/v1', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
