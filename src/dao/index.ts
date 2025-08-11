import { db } from '../configs/db';
import ContractDao from './implementations/ContractDao';
import ProjectDao from './implementations/ProjectDao';
import UserDao from './implementations/UserDao';

export const userDao = new UserDao(db);
export const contractDao = new ContractDao(db);
export const projectDao = new ProjectDao(db);
