import { createHash } from "../../utils.js";
import { UserModel } from "./models/usersModel.js";

export default class UserDao {

    async createUser (userData) {
      try {
        const email = userData.email;
        const password = userData.password;
        const existUser = await UserModel.find(email);
        if (existUser.length === 0) {
            if (email === 'adminCoder@coder.com' && password === 'adminCoder123'){
                return await UserModel.create({...userData, password: createHash(password), role: 'admin'});
            } else {
                const newUser = await UserModel.create({...userData, password: createHash(password)});
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
    
    async getUserByID (id) {
      try { 
        const userByID = await UserModel.findById(id);
        if(userByID){
          return userByID
        } else {
          return false
        };
      } catch (error) {
        console.log(error)
      }
    };

    async getUserByEmail (email) {
      try { 
        const userByEmail = await UserModel.findOne(email);
        if (userByEmail) {
          return userByEmail
        } else {
          return false
        };
      } catch (error) {
        console.log(error)
      }
    };
  };  