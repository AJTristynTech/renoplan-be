import { NewProject, Project, projects } from '@/src/db/schema/project';
import SuperDao from './SuperDao';
import IProjectDao from '../contracts/IProjectDao';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { logger } from '@/src/configs/logger';
import { eq } from 'drizzle-orm';

export default class ProjectDao
  extends SuperDao<Project, NewProject>
  implements IProjectDao
{
  constructor(db: NodePgDatabase) {
    super(db, projects);
  }

  async findByID(id: number): Promise<Project | undefined> {
    try {
      const result = await this.db
        .select()
        .from(projects)
        .where(eq(projects.id, id))
        .limit(1);
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findByUserId(userId: number): Promise<Project[]> {
    try {
      const result = await this.db
        .select()
        .from(projects)
        .where(eq(projects.user_id, userId));
      return result;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async create(project: NewProject): Promise<Project> {
    try {
      const result = await this.db
        .insert(projects)
        .values({
          ...project,
          user_id: project.user_id,
        })
        .returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async update(
    id: number,
    data: Partial<Project>,
  ): Promise<Project | undefined> {
    try {
      const result = await this.db
        .update(projects)
        .set(data)
        .where(eq(projects.id, id))
        .returning();
      return result[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
