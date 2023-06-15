import { UserModel } from "./models/usersModel";

export default class UserDao {

    async createUser (userData) {
      try {
        const email = userData.email;
        const password = userData.password;
        const existUser = await UserModel.find(email);
        if (existUser.length === 0) {
            if (email === 'adminCoder@coder.com' && password === 'adminCoder123'){
                return await UserModel.create({...userData, role: 'admin'});
            } else {
                const newUser = await UserModel.create(userData);
                return newUser
          }
        } else {
          return null;
        }
      } catch (error) {
            console.log(error)
      }
    };
  
    async loginUser (userData) {
      try {
        const email = userData.email;
        const password = userData.password;
        const findUser = await UserModel.findOne({email: email, password: password});
        if (!findUser) {
            return null;
        } else {
            return findUser;
        }
      } catch (error) {
            console.log(error);
      }
    };    
  };  