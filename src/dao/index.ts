import { db } from '../configs/db';
import ContractDao from './implementations/ContractDao';
import ProjectDao from './implementations/ProjectDao';
import TradeContractDao from './implementations/TradeContractDao';
import UserDao from './implementations/UserDao';
import WorkAreaDao from './implementations/WorkAreaDao';

export const userDao = new UserDao(db);
export const contractDao = new ContractDao(db);
export const projectDao = new ProjectDao(db);
export const tradeContractDao = new TradeContractDao(db);
export const workAreaDao = new WorkAreaDao(db);
