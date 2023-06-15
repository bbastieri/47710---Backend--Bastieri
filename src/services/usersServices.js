import UsersDao from "../dao/mongoDB/usersDao.js";

const usersDao = new UsersDao();

export const createUserService = async (userData) => {
    try {
        const newUser = await usersDao.createUser(userData);            
        return newUser
    } catch (error) {
        console.log (error)
    }
}

export const loginUserService = async (userData) => {
    try {
        const login = await users.loginUser(userData);
        return login
    } catch (error) {
        console.log (error)
    }
}