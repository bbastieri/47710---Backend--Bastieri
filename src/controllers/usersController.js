import { createUserService, loginUserService } from "../services/usersServices.js";
import { generateToken } from "../jwt/auth.js";
import UserDao from "../dao/mongoDB/usersDao.js";
const userDao = new UserDao();

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
      next(error);
    }
};

/* export const createUserController = async (req, res, next) => {
    try {
        const docs = await createUserService(req.body);
        if (docs) {
            res.redirect('/views/login')
        } else {
            res.redirect('/views/register-error')
        }
    } catch (error) {
        next (error)
    }
};

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(req.body);
        if (user) {
            req.session.email = email; 
            req.session.password = password;
            res.redirect('/views/home') 
        } else {
            res.redirect('/views/login-error')
        }
    } catch (error) {
        next (error)
    }
};

export const registerResponse = async (req, res, next) => {
    try {
        res.json({message: 'Register OK', session: req.session})
    } catch (error) {
        next (error)
    }
};

export const loginResponse = async (req, res, next) => {
    try {   
        res.json({message: 'Login OK', session: req.session})
    } catch (error) {
        next (error)
    }
};

export const githubResponse = async (req, res, next) => {
    try {
        const { firstName, lastName, email, role, githubUser } = req.user;
        res.json({message: 'Github Register/Login OK', session: req.session, userData: { firstName, lastName, email, role, githubUser}});
    } catch (error) {
        next (error)
    }
}; */

