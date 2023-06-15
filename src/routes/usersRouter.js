import { Router } from 'express';
import { createUserController, loginUserController } from '../controllers/usersController.js';

const router = Router();

router.post('/register', createUserController);
router.post('/login', loginUserController);

export default router;