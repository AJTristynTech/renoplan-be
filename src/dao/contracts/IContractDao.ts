import { Contract, NewContract } from '@/src/db/schema/contracts';

export default interface IContractDao {
  findByID(id: number): Promise<Contract | undefined>;
  findByProjectId(projectId: number): Promise<Contract | undefined>;
  create(contract: NewContract): Promise<Contract>;
  update(id: number, data: Partial<Contract>): Promise<Contract | undefined>;
}
