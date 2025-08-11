import { db } from '../configs/db';
import ContractDao from './implementations/ContractDao';
import UserDao from './implementations/UserDao';

export const userDao = new UserDao(db);
export const contractDao = new ContractDao(db);
