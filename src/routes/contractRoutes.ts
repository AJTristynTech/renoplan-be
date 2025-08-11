import { Router } from 'express';
import ContractController from '../controllers/ContractController';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const contractController = new ContractController();

router.post('/create', authMiddleware, contractController.createContract);
router.get(
  '/project/:projectId',
  authMiddleware,
  contractController.getContractByProjectId,
);
router.get('/:id', authMiddleware, contractController.getContractById);
router.put('/:id', authMiddleware, contractController.updateContract);

export default router;
