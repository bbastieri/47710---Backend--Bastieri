import { CartModel } from "./models/cartModel";

export default class CartDaoMongoDB {

    async getAllCarts() {
        try{
            const response = await CartModel.find({})
            return response
        }catch (error){
            console.log(error)
        }
    }

    async getCartByID (cid) {
        try{
            const response = await CartModel.findById(cid);
            return response;
        }catch(error) {
            console.log(error)
        }
    };

    async createCart (obj) {
        try{
            const response = await CartModel.create(obj)
            return response;
        } catch(error) {
            console.log(error)
        }
    }

    async deleteCart () {
        try{
            const response = await CartModel.deleteMany({});
            return response;
        }catch (error) {
            console.log(error)
        }
    };

}