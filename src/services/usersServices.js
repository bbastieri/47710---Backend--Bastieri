import UserDao from "../dao/mongoDB/usersDao.js";
import { loggerDev } from "../utils/logger.js";
import { transporter } from "./emailServices.js";
import { UserModel } from "../dao/mongoDB/models/usersModel.js";

const usersDao = new UserDao();

export const createUserService = async (userData) => {
    try {
        const newUser = await usersDao.createUser(userData);            
        return newUser
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
};

export const loginUserService = async (userData) => {
    try {
        const login = await usersDao.loginUser(userData);
        return login
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
};

export const getByIDService = async (id) => {
    try {
        const getByID = await usersDao.getUserByID(id);
        return getByID
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
};

export const getByEmailService = async (email) => {
    try { 
        const getByEmail = await usersDao.getUserByEmail(email);
        return getByEmail
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
};

export const getUserDto = async (id) => {
    try {
      const data = await usersDaoMongo.getByIdDTO(id);
      if(!data) return false
     return data
  } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)           
  }
};

export const sendNotification = async(usuario) => {
    try {
        const emailOptions = {
            from: config.emailEthereal,
            to: usuario.email, 
            subject: 'Inactivity notification',
            text: `Hi ${usuario.first_name},\n\nYour account has been inactive for a while. Please notice that it will be deleted ver soon`, 
        };
  
        await transporter.sendMail(emailOptions);
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error(error);
    }
};

export const deleteInactiveUsers = async () => {
    try {
        const inactiveTime = new Date();
        inactiveTime.setDate(inactiveTime.getDate() - 2);
  
        const inactiveUser = await UserModel.find({
            lastConection: { $lt: inactiveTime },
        });
  
        for (const user of inactiveUser) {
    
            await this.sendNotification(user);
  
            await usuario.remove();
        }
    } catch (error) {
        loggerDev.error('Error deleting inactive users:', error);
        throw new Error(error);
    }
};

