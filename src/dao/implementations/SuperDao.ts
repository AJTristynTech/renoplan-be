import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import ISuperDao from '../contracts/ISuperDao';
import { PgTable, pgTable } from 'drizzle-orm/pg-core';
import { logger } from '@/src/configs/logger';
import { eq, sql } from 'drizzle-orm';

export default class SuperDao<T, TInsert = Partial<T>>
  implements ISuperDao<T, TInsert>
{
  protected db: NodePgDatabase;
  protected table: PgTable;

  constructor(db: NodePgDatabase, table: PgTable) {
    this.db = db;
    this.table = table;
  }

  async findAll(): Promise<T[]> {
    try {
      return (await this.db.select().from(this.table)) as T[];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<T | undefined> {
    try {
      const result = await this.db
        .select()
        .from(this.table)
        .where(eq(this.table, id))
        .limit(1);

      return result[0] as T;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findOneByWhere(whereCondition: any): Promise<T | undefined> {
    try {
      const result = await this.db
        .select()
        .from(this.table)
        .where(whereCondition)
        .limit(1);
      return result[0] as T;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findByWhere(
    whereCondition: any,
    limit?: number,
    offset?: number,
  ): Promise<T[]> {
    try {
      let query = this.db
        .select()
        .from(this.table)
        .where(whereCondition)
        .limit(limit ?? 10)
        .offset(offset ?? 0);

      return (await query) as T[];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async create(data: TInsert): Promise<T> {
    try {
      if (!data) {
        throw new Error('Data is required');
      }

      const result = await this.db.insert(this.table).values(data).returning();

      return result[0] as T;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async update(id: number, data: Partial<T>): Promise<T | undefined> {
    try {
      const result = await this.db
        .update(this.table)
        .set(data)
        .where(eq(this.table, id))
        .returning();

      return result[0] as T;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.db
        .delete(this.table)
        .where(eq(this.table, id))
        .returning();

      return result.length > 0;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
  async count(whereCondition?: any): Promise<number> {
    try {
      const query = whereCondition
        ? this.db
            .select({ count: sql<number>`count(*)` })
            .from(this.table)
            .where(whereCondition)
        : this.db.select({ count: sql<number>`count(*)` }).from(this.table);

      const result = await query;
      return result[0].count;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
