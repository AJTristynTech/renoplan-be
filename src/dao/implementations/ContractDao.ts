import { Contract, contracts, NewContract } from '@/src/db/schema/contracts';
import SuperDao from './SuperDao';
import IContractDao from '../contracts/IContractDao';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { logger } from '@/src/configs/logger';

export default class ContractDao
  extends SuperDao<Contract, NewContract>
  implements IContractDao
{
  constructor(db: NodePgDatabase) {
    super(db, contracts);
  }

  async findByID(id: number): Promise<Contract | undefined> {
    try {
      const result = await this.db
        .select()
        .from(contracts)
        .where(eq(contracts.id, id))
        .limit(1);
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findByProjectId(projectId: number): Promise<Contract | undefined> {
    try {
      const result = await this.db
        .select()
        .from(contracts)
        .where(eq(contracts.project_id, projectId))
        .limit(1);
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async create(contract: NewContract): Promise<Contract> {
    try {
      const result = await this.db
        .insert(contracts)
        .values(contract)
        .returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async update(
    id: number,
    data: Partial<Contract>,
  ): Promise<Contract | undefined> {
    try {
      const result = await this.db
        .update(contracts)
        .set(data)
        .where(eq(contracts.id, id))
        .returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
