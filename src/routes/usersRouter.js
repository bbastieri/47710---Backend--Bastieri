import { Router } from 'express';
import passport from 'passport';
import { createUserController, 
         loginUserController, 
         loginFrontController, 
         privateRouteController, 
         getByDTOController, 
         allUsersDTOController,
         updateStatusController,
         updatePassController, 
         updatePassEmailController,
         deleteIanctiveUsersController} from '../controllers/usersController.js';
import { checkAuth } from '../jwt/auth.js';
import { multerField } from '../controllers/usersController.js';

const router = Router();

router.get('/register-github', passport.authenticate('github', {scope: ['user:email'] }));
router.post('/loginfront', loginFrontController);
router.post('/register', createUserController);
router.post('/login', loginUserController);
router.get('/getAll', allUsersDTOController)
router.post('/:uid/documents', multerField.single('documentFile'), async (req, res) => {
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
router.get('/private', checkAuth, privateRouteController);
router.get('/current', passport.authenticate('current'), (req , res) => { res.send (req.user)});
router.get('/dto/:id', getByDTOController );
router.put('/premium/:uid', updateStatusController);
router.put('/changePassword' , updatePassEmailController)
router.post('/updatePass', updatePassController);
router.delete('/delete', deleteIanctiveUsersController);

export default router;

