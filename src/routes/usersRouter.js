import { Router } from 'express';
import passport from 'passport';
import { createUserController, loginUserController, registerResponse, loginResponse, githubResponse } from '../controllers/usersController.js';

const router = Router();

router.post('/register', passport.authenticate('register', registerResponse));
router.post('/login', passport.authenticate('login'), loginResponse);

router.get('/register-github', passport.authenticate('github', {scope: ['user:email'] }));
router.get('/profile-github', passport.authenticate('github', {scope: ['user:email']}), githubResponse);

export default router;