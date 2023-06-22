import { createUserService, loginUserService } from "../services/usersServices.js";

export const createUserController = async (req, res, next) => {
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
};

