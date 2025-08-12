import { Router } from 'express';
import TradeContractController from '../controllers/TradeContractController';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const tradeContractController = new TradeContractController();

router.get('/list', authMiddleware, tradeContractController.getTradeContracts);
router.get('/:id', authMiddleware, tradeContractController.getTradeById);
router.post(
  '/create',
  authMiddleware,
  tradeContractController.createTradeContract,
);
router.put('/:id', authMiddleware, tradeContractController.updateTradeContract);

export default router;
