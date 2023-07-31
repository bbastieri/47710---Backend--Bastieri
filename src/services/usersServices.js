import UsersDao from "../dao/mongoDB/usersDao.js";

const usersDao = new UsersDao();

export const createUserService = async (userData) => {
    try {
        const newUser = await usersDao.createUser(userData);            
        return newUser
    } catch (error) {
        console.log (error)
    }
};

export const loginUserService = async (userData) => {
    try {
        const login = await usersDao.loginUser(userData);
        return login
    } catch (error) {
        console.log (error)
    }
};

export const getByIDService = async (id) => {
    try {
        const getByID = await usersDao.getUserByID(id);
        return getByID
    } catch (error) {
        console.log (error)
    }
};

export const getByEmailService = async (email) => {
    try { 
        const getByEmail = await usersDao.getUserByEmail(email);
        return getByEmail
    } catch (error) {
        console.log(error)
    }
};

export const getUserDto = async (id) => {
    try {
      const data = await usersDaoMongo.getByIdDTO(id);
      if(!data) return false
     return data
  } catch (error) {
    console.log(error);
  }
};


