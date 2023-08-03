import { createHash } from "../../utils/utils.js";
import { UserModel } from "./models/usersModel.js";
import { CartModel } from "./models/cartModel.js";
import { UserDTO } from "../../dto/user.dto.js"

export default class UserDao {

    async createUser (userData) {
      try {
        const { firstName, lastName,  age, cart,  email, password } = userData;
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
          throw new Error(error)
      }
    };
  
    async loginUser (userData) {
      try {
        const { email, password } = userData;
        const findUser = await UserModel.findOne({email: email, password: password});
        if (!findUser) {
            return null;
        } else {
            return findUser;
        }
      } catch (error) {
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
          throw new Error(error)
      }
    };

    async getUserByDTO (_id) {
      try {
        const userByDTO = await UserModel.findById(_id);
        const userDTO = new UserDTO (userByDTO);
        return userDTO
      } catch (error){
          throw new Error(error)
      }
    };

  };  