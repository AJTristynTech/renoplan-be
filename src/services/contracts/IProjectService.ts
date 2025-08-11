import { NewProject, Project } from '@/src/db/schema/project';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';

export default interface IProjectService {
  createProject(project: NewProject): Promise<ApiServiceResponse>;
  getProjectByUserId(userId: number): Promise<ApiServiceResponse>;
  getProjectById(id: number): Promise<ApiServiceResponse>;
  updateProject(
    id: number,
    data: Partial<Project>,
  ): Promise<ApiServiceResponse>;
}
