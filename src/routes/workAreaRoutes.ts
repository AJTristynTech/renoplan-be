import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import WorkAreaController from '../controllers/WorkAreaController';

const router = Router();

const workAreaController = new WorkAreaController();

router.get('/list', authMiddleware, workAreaController.getWorkAreas);
router.get('/:id', authMiddleware, workAreaController.getWorkAreaById);
router.get(
  '/scope-type/:scopeType',
  authMiddleware,
  workAreaController.getWorkAreasByScopeType,
);

router.post('/create', authMiddleware, workAreaController.createWorkArea);
router.put('/:id', authMiddleware, workAreaController.updateWorkArea);
router.post(
  '/:id/trades',
  authMiddleware,
  workAreaController.addTradesToWorkArea,
);
router.get(
  '/:id/trades',
  authMiddleware,
  workAreaController.getTradesForWorkArea,
);

export default router;
