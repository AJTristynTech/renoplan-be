import { Router } from 'express';
import AuthConroller from '../controllers/AuthController';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const authController = new AuthConroller();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.me);

export default router;
