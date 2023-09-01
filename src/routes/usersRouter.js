import { Router } from 'express';
import passport from 'passport';
import { register, login, loginFront, privateRoute, getUserDtoController } from '../controllers/usersController.js';
import { checkAuth } from '../jwt/auth.js';
import { changeStatus } from '../controllers/changeStatusController.js';
import { sendEmail, updatePass } from '../controllers/changePassController.js';

const router = Router();

router.get('/register-github', passport.authenticate('github', {scope: ['user:email'] }));
router.post('/loginfront', loginFront);
router.post('/register', register);
router.post('/login', login);
router.get('/private', checkAuth, privateRoute);
router.get('/current', passport.authenticate('current'), (req , res) => { res.send (req.user)});
router.get('/dto/:id', getUserDtoController );
router.put('/premium/:uid', changeStatus);
router.post('/changePassword' , sendEmail)
router.post('/updatePass', updatePass);


export default router;

