import { createUserService,
         loginUserService, 
         getByIDService, 
         getByEmailService, 
         getByDTOService, 
         allUsersDTOService, 
         updateStatusService,
         updatePassService  } from "../services/usersServices.js";
import { transporter, updatePassEmail } from "../services/emailServices.js";        
import { generateToken } from "../jwt/auth.js";
import UserDao from "../dao/mongoDB/usersDao.js";
import HttpResponse from '../utils/httpResponse.js'
import { loggerDev } from "../utils/logger.js";
import multer from "multer";
import { __dirname } from "../path.js";

const userDao = new UserDao();
const httpResponse = new HttpResponse();

export const createUserController = async (req, res, next) => {
    try {
      const { firstName, lastName, email, age, cart, password } = req.body;
      const existUser = await userDao.getUserByEmail(email);
      if (existUser) return res.status(400).json({ msg: 'user already exists' });
      const userData = { firstName, lastName, email, age, cart, password }
      const newUser = await userDao.createUser(userData);
      const token = generateToken(newUser);
      res.json({
        msg: 'Register OK',
        token
      })
    } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.ServerError(res, error)
    }
};
  
export const loginUserController = async (req, res, next) => {
    try {
    const { email, password } = req.body;
    const userData = await loginUserService({ email, password });
    if (!userData) res.json({ msg: 'invalid credentials' });
    const lastConnection = user.last_connection = new Date();
    user.save();
    const accessToken = generateToken(userData);
    res.header('authorization', accessToken).json({ msg: 'Login OK', accessToken, lastConnection })
  } catch (error) {
    loggerDev.error(error.message)
    next(error);
  }
};

export const getByIDController = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await getByIDService(id)
      res.json(user)
    } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.ServerError(res, error)
    }
};

export const getByEmailController = async (req, res, next) => {
  try {
    const { email } = req.params
    const user = await getByEmailService(email)
    res.json(user)
  } catch (error) {
    loggerDev.error(error.message)
    return httpResponse.ServerError(res, error)
  }
};

export const getByDTOController = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await getByDTOService(id)
      res.json(user)
      
    } catch (error) {
          loggerDev.error(error.message)
          return httpResponse.ServerError(res, error)
      }
};

export const allUsersDTOController = async (req, res, next) => {
  try {
    const users = await allUsersDTOService()
    res.json(users)
  } catch (error) {
    loggerDev.error(error.message)
    return new httpResponse.NotFound(res, error)
  }
};

export const updateStatusController = async (req, res, next) => {
  try {

      const { uid } = req.params;
      const user = await createUserService(uid)
      const newRole = user.role === 'user' ? 'premium' : 'user';
      const updatedRole = await updateStatusService(uid, newRole);
      res.json({ message: 'Role updated successfully', newRole: updatedRole});

  } catch (error) {
      
      loggerDev.error(error.message)
      return new httpResponse.NotFound(res, error)
  }
};

export const updatePassController = async (req, res) => {
  const email = req.body.email;
  const { currentPass, newPass, confirmNewPass } = req.body;
  if (newPass !== confirmNewPass) {
      return res.send('New and confirmation pass do not match')
  }
  try {
      const user = await updatePassService(email)
      if(!user) {
          return res.status(404).send('User not found')
      }

      if(!validPassword(currentPass, user)) {
          return res.send('Incorrect current password')
      }

      const newPassHash = createHash(newPass);
      await userDao.updatePass(user._id, newPassHash)
      res.send('Password updated successfully')

  } catch (error) {
      throw new Error (error)
  }
};

export const updatePassEmailController = async (req, res) => {
  try {
      const response = await transporter.sendMail(updatePassEmail)
      res.json(response)
  } catch (error) {
      throw new Error(error)
  }
};

export const privateRouteController = async (req, res) => {
  const { firstName, lastName, email, role } = req.user;
  res.json({
    status: 'success',
    userData: {
      firstName,
      lastName,
      email,
        role
      }
    })
};
    
export const loginFrontController = async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const userData = await userDao.loginUser({ email, password });
        if (!userData) {
          return res. json({ msg: 'invalid credentials' });
        }
        const accessToken = generateToken(userData)
        res.cookie('token', accessToken,
        { httpOnly: true } 
        )
        res.json({ msg: 'Login OK', accessToken })
      } catch (error) {
        loggerDev.error(error.message)
        return httpResponse.ServerError(res, error)
      }
};
    
    
export const deleteIanctiveUsersController = async (req, res, next) => {
      try {
    await deleteIanctiveUsers();
    res.status(200).json({ message: 'Delete completed' });
  } catch (error) {
    loggerDev.error(error.message)
  }
};
  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      let uploadDir;
  
      if (file.fieldname === 'profileImage') {
        uploadDir = __dirname + '/public/profiles';
      } else if (file.fieldname === 'productImage') {
        uploadDir = __dirname + '/public/products';
      } else if (file.fieldname === 'documentFile') {
        uploadDir = __dirname + '/public/documents';
      } else {
        uploadDir = __dirname + '/public/unknown';
      }
  
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
  
export const multerField = multer({ storage });