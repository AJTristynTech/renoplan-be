import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const projectController = new ProjectController();

router.post('/create', authMiddleware, projectController.createProject);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.get(
  '/user/:userId',
  authMiddleware,
  projectController.getProjectByUserId,
);
router.put('/:id', authMiddleware, projectController.updateProject);

export default router;
