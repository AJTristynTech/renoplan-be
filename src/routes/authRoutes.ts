import { Router } from 'express';
import AuthConroller from '../controllers/AuthController';

const router = Router();

const authController = new AuthConroller();

router.post('/register', authController.register);
router.post('/check-email', authController.checkEmail);
router.post('/login', authController.login);

export default router;
