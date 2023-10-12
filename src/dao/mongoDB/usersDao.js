import { createHash, validPassword } from "../../path.js";
import { UserModel } from "./models/usersModel.js";
import { CartModel } from "./models/cartModel.js";
import UserDto  from "../../dto/user.dto.js";
import AllUsersDto from"../../dto/allUsers.dto.js";
import { loggerDev } from "../../utils/logger.js";

export default class UsersDao {

    async createUser (userData) {
      try {
        const { firstName, lastName, email, age, password } = userData;
        const existUser = await UserModel.find({email});
        if (existUser.length === 0) {
            if (email === 'adminCoder@coder.com' && password === 'adminCoder123'){
                return await UserModel.create({...userData, password: createHash(password), role: 'admin'});
            } else {
                const newUser = await UserModel.create({...userData, password: createHash(password)});
                const newCart = await CartModel.create({ products: [] });

                newUser.cart = newCart._id;
                await newUser.save();

                return newUser
          }
        } else {
          return null;
        }
      } catch (error) {
          loggerDev.error(error.message)
          throw new Error(error)
      }
    };
  
    async loginUser (userData) {
      try {
        const { email, password } = userData;
        const findUser = await UserModel.findOne({email: email});
        console.log(findUser)
        if (findUser) {
            const validUser = validPassword(findUser, password);
            if (!validUser) return false;

            findUser.lastConnection = new Date();
            await findUser.save();

            return findUser
        }
      } catch (error) {
        loggerDev.error(error.message)
          throw new Error(error)
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
          loggerDev.error(error.message)
          throw new Error(error)
      }
    };

    async getUserByEmail (email) {
      try { 
        const userByEmail = await UserModel.findOne({email});
        if (userByEmail) {
          return userByEmail
        } else {
          return false
        };
      } catch (error) {
          loggerDev.error(error.message)
          throw new Error(error)
      }
    };

    async getUserByDTO (_id) {
      try {
        const userByDTO = await UserModel.findById(_id);
        const userDTO = new UserDto (userByDTO);
        return userDTO
      } catch (error){
          loggerDev.error(error.message)
          throw new Error(error)
      }
    };

    async getAllUsersDTO() {
      try {
        const user = await UserModel.find()
        const userDTO = user.map(user => new AllUsersDto(user));
        return userDTO
      } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
      }
    };

    async updateStatus (uid, role) {
      try {
        await UserModel.updateOne({ _id: uid }, { role: role })
        return role
      } catch (error){
        loggerDev.error(error.message)
        throw new Error(error)
      }
    };

    async updatePass (uid, password) {
      try {
        await UserModel.updateOne({ _id: uid }, { password: password })
        return password
      } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
      }  
    };
  }
   