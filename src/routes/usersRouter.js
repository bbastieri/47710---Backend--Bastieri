import { Router } from 'express';
import passport from 'passport';
import { register, login, loginFront, privateRoute } from '../controllers/usersController.js';
import { checkAuth } from '../jwt/auth.js';

const router = Router();

router.get('/register-github', passport.authenticate('github', {scope: ['user:email'] }));
router.post('/loginfront', loginFront);
router.post('/register', register);
router.post('/login', login);
router.get('/private', checkAuth, privateRoute);
router.get('/current', passport.authenticate('current'), (req , res) => { res.send (req.user)});
router.get('/dto/:id', getUserDtoController )

export default router;

