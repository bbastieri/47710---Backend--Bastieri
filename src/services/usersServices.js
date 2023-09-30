import UserDao from "../dao/mongoDB/usersDao.js";
import { loggerDev } from "../utils/logger.js";
import { transporter, deactivationEmail } from "./emailServices.js";
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

export const getByDTOService = async (id) => {
    try {
      const data = await usersDao.getUserByDTO(id);
      if(!data) return false
     return data
  } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)           
  }
};

export const allUsersDTOService = async () => {
    try {
      const data = await usersDao.getAllUsersDTO();
      if(!data) return false
      return data
  } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
  }
};

export const updateStatusService = async (uid, role) => {
    try {
        const user = await usersDao.getUserByID(uid);
        if(!user) {
            throw new Error('User not found')
        }

        if(role === 'premium'){
            user.prodCreator = true;
            await user.save()
        }

        const updatedRole = await usersDao.updateStatus(uid, role);
        return updatedRole
        
    } catch (error) {
        loggerDev.error(error.message);
        throw error
    }
};

export const updatePassService = async (email) => {
    try { 
        const updatePass = await usersDao.updatePass(email);
        return updatePass
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
}

export const deleteInactiveUsersService = async () => {
    try {
        const inactiveTime = new Date();
        inactiveTime.setDate(inactiveTime.getDate() - 2);
        
        const inactiveUser = await UserModel.find({
            lastConection: { $lt: inactiveTime },
        });
        
        for (const user of inactiveUser) {
            
            await this.sendNotificationService(user);
            
            await user.remove();
        }
    } catch (error) {
        loggerDev.error('Error deleting inactive users:', error);
        throw new Error(error);
    }
};

export const sendNotificationService = async(user) => {
    try {
        const emailOptions = await deactivationEmail(user);
        await transporter.sendMail(emailOptions);
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error(error);
    }
};
