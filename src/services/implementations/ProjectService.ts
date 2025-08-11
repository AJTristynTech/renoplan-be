import IProjectDao from '@/src/dao/contracts/IProject';
import IProjectService from '../contracts/IProjectService';
import { projectDao } from '@/src/dao';
import { NewProject, Project } from '@/src/db/schema/project';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';
import httpStatus from 'http-status';

export default class ProjectService implements IProjectService {
  private projectDao: IProjectDao;

  constructor() {
    this.projectDao = projectDao;
  }

  async createProject(project: NewProject): Promise<ApiServiceResponse> {
    try {
      const newProject = await this.projectDao.create(project);

      return {
        statusCode: httpStatus.CREATED,
        response: {
          status: true,
          code: httpStatus.CREATED,
          message: 'Project created successfully',
          data: newProject,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create project ' + error,
          data: [],
        },
      };
    }
  }

  async getProjectById(id: number): Promise<ApiServiceResponse> {
    try {
      const project = await this.projectDao.findByID(id);

      if (!project) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'Project not found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Project fetched successfully',
          data: project,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch project' + error,
          data: [],
        },
      };
    }
  }

  async getProjectByUserId(userId: number): Promise<ApiServiceResponse> {
    try {
      const projects = await this.projectDao.findByUserId(userId);

      if (projects.length === 0) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'No projects found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Projects fetched successfully',
          data: projects,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch projects' + error,
          data: [],
        },
      };
    }
  }

  async updateProject(
    id: number,
    data: Partial<Project>,
  ): Promise<ApiServiceResponse> {
    try {
      const project = await this.projectDao.update(id, data);

      if (!project) {
        return {
          statusCode: httpStatus.NOT_FOUND,
          response: {
            status: false,
            code: httpStatus.NOT_FOUND,
            message: 'Project not found',
            data: [],
          },
        };
      }

      return {
        statusCode: httpStatus.OK,
        response: {
          status: true,
          code: httpStatus.OK,
          message: 'Project updated successfully',
          data: project,
        },
      };
    } catch (error) {
      return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        response: {
          status: false,
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update project' + error,
          data: [],
        },
      };
    }
  }
}
