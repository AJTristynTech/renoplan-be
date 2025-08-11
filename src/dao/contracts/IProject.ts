import { NewProject, Project } from '@/src/db/schema/project';

export default interface IProjectDao {
  findByID(id: number): Promise<Project | undefined>;
  findByUserId(userId: number): Promise<Project[]>;
  create(project: NewProject): Promise<Project>;
  update(id: number, data: Partial<Project>): Promise<Project | undefined>;
}
