import { Router } from 'express';
import passport from 'passport';
import { register, login, loginFront, privateRoute, getUserDtoController } from '../controllers/usersController.js';
import { checkAuth } from '../jwt/auth.js';
import { changeStatus } from '../controllers/changeStatusController.js';
import { sendEmail, updatePass } from '../controllers/changePassController.js';
import { multerField } from '../controllers/usersController.js';

const router = Router();

router.get('/register-github', passport.authenticate('github', {scope: ['user:email'] }));
router.post('/loginfront', loginFront);
router.post('/register', register);
router.post('/login', login);
router.post('/:uid/documents', uploader.single('documentFile'), async (req, res) => {
    try {
      const { uid } = req.params;
      const { file } = req;
      if (!file) {
        return res.status(400).json({ msg: 'No file available' });
      };
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: uid },
        {
          $push: {
            documents: {
              name: file.originalname,
              reference: file.filename,
            },
          },
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' })
      };
      res.status(201).json({ msg: 'Document updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error uploading document:', error);
      res.status(500).json({ msg: 'Error uploading document' });
    }
});
router.get('/private', checkAuth, privateRoute);
router.get('/current', passport.authenticate('current'), (req , res) => { res.send (req.user)});
router.get('/dto/:id', getUserDtoController );
router.put('/premium/:uid', changeStatus);
router.post('/changePassword' , sendEmail)
router.post('/updatePass', updatePass);


export default router;

