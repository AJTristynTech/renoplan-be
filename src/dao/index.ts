import { db } from '../configs/db';
import UserDao from './implementations/UserDao';

export const userDao = new UserDao(db);
