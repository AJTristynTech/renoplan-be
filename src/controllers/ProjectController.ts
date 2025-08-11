import { Request, Response } from 'express';
import IProjectService from '../services/contracts/IProjectService';
import ProjectService from '../services/implementations/ProjectService';
import { logger } from '../configs/logger';
import httpStatus from 'http-status';

export default class ProjectController {
  private projectService: IProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  createProject = async (req: Request, res: Response) => {
    try {
      const project = await this.projectService.createProject(req.body);

      const { message, data, status } = project.response;
      const code = project.statusCode;

      res.status(project.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  getProjectById = async (req: Request, res: Response) => {
    try {
      const projectId = Number(req.params.id);

      const project = await this.projectService.getProjectById(projectId);

      const { message, data, status } = project.response;
      const code = project.statusCode;

      res.status(project.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  getProjectByUserId = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);

      const project = await this.projectService.getProjectByUserId(userId);

      const { message, data, status } = project.response;
      const code = project.statusCode;

      res.status(project.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };

  updateProject = async (req: Request, res: Response) => {
    try {
      const projectId = Number(req.params.id);
      const project = await this.projectService.updateProject(projectId, {
        ...req.body,
        updatedAt: new Date(),
      });

      const { message, data, status } = project.response;
      const code = project.statusCode;

      res.status(project.statusCode).send({ status, code, message, data });
    } catch (error) {
      logger.error(error);
      res.status(httpStatus.BAD_GATEWAY).send(error);
    }
  };
}
