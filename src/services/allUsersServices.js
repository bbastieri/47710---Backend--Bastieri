import UserDao from '../dao/mongoDB/usersDao.js';
import { loggerDev } from '../utils/logger.js';

const userDao = new UserDao();

export const AllUsersDtoService = async () => {
    try {
      const data = await userDao.getAllUsersDto();
      if(!data) return false
      return data
  } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
  }
};