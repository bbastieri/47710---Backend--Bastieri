import { createUserService, loginUserService  } from "../services/usersServices.js";

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
        const user = await loginUserController(req.body);
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
}