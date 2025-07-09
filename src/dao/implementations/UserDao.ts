import { NewUser, User, users } from '@/src/db/schema/user';
import SuperDao from './SuperDao';
import IUserDao from '../contracts/IUserDao';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { logger } from '@/src/configs/logger';

export default class UserDao
  extends SuperDao<User, NewUser>
  implements IUserDao
{
  constructor(db: NodePgDatabase) {
    super(db, users);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async isEmailExists(email: string): Promise<boolean> {
    try {
      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      return result.length > 0;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createWithTransaction(
    user: NewUser,
    tx?: NodePgDatabase,
  ): Promise<User> {
    try {
      const database = tx || this.db;
      const result = await database.insert(users).values(user).returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async create(user: NewUser): Promise<User> {
    try {
      const result = await this.db.insert(users).values(user).returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updatePassword(
    userId: number,
    hashedPassword: string,
  ): Promise<User | undefined> {
    try {
      const result = await this.db
        .update(users)
        .set({
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId))
        .returning();

      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
