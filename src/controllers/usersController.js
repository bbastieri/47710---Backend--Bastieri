import { createUserService, loginUserService } from "../services/usersServices.js";
import { generateToken } from "../jwt/auth.js";
import UserDao from "../dao/mongoDB/usersDao.js";
import HttpResponse from '../utils/httpResponse.js'
import { loggerDev } from "../utils/logger.js";
import multer from "multer";
import { __dirname } from "../path.js";

const userDao = new UserDao();
const httpResponse = new HttpResponse();

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


export const register = async (req, res, next) => {
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
  
export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await userDao.loginUser({ email, password });
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

export const privateRoute = async (req, res) => {
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
  
export const loginFront = async (req, res, next) => {
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

export const getUserDtoController = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await getUserDto(id)
       res.json(user)
      
      } catch (error) {
        loggerDev.error(error.message)
        return httpResponse.ServerError(res, error)
    }
};

export const deleteIanctiveUsers = async (req, res, next) => {
  try {
    await deleteIanctiveUsers();
    res.status(200).json({ message: 'Delete completed' });
  } catch (error) {
    loggerDev.error(error.message)
  }
}  