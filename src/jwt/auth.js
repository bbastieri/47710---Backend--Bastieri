import jwt from "jsonwebtoken";
import UserDao from "../dao/mongoDB/usersDao.js";

const userDao = new UserDao();

const PRIVATE_KEY = '1234';

export const generateToken = (user) => {
    const payload = {
        userID: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,    
    }

    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '1h',
    });
    return token;
};

export const checkAuth = async (req, res, next) => {
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.status(401).json({msg:'Unauthorized'});
        const token = authHeader.split('')[1];
        const decode = jwt.verify(token, PRIVATE_KEY);
        const user = await userDao.getUserByID(decode.userID);
        if(!user) return res.status(401).json({msg:'Unauthorized'});
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
    }
}