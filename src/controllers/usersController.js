import { createUserService, loginUserService } from "../services/usersServices.js";
import { generateToken } from "../jwt/auth.js";
import UserDao from "../dao/mongoDB/usersDao.js";
import HttpResponse from '../utils/httpResponse.js'


const userDao = new UserDao();
const httpResponse = HttpResponse();

export const register = async (req, res, next) => {
    try {
      const { firstName, lastName, email, age, cart, password } = req.body;
      const existUser = await userDao.getUserByEmail(email);
      if (existUser) return res.status(400).json({ msg: 'user already exists' });
      const userData = { firstName, lastName, email, age, password }
      const newUser = await userDao.createUser(userData);
      const token = generateToken(newUser);
      res.json({
        msg: 'Register OK',
        token
      })
    } catch (error) {
      next(error);
    }
};
  
export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await userDao.loginUser({ email, password });
      if (!userData) req.json({ msg: 'invalid credentials' });
      const access_token = generateToken(userData);
      res.header('authorization', access_token).json({ msg: 'Login OK', access_token })
    } catch (error) {
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
      const access_token = generateToken(userData)
      res.cookie('token', access_token,
        { httpOnly: true } 
      )
        res.json({ msg: 'Login OK', access_token })
    } catch (error) {
      return httpResponse.ServerError(res, error)
    }
};

export const getUserDtoController = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await getUserDto(id)
       res.json(user)
      
      } catch (error) {
        return httpResponse.ServerError(res, error)
    }
  }