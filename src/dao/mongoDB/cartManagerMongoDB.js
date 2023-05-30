import { CartModel } from "./models/cartModel";

export default class CartManagerMongoDB {

    async getCartByID (id) {
        try{
            const response = await CartModel.findById(id);
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async deleteCart () {
        try{
            const response = await CartModel.deleteMany({});
            return response;
        }catch (error) {
            console.log(error)
        }
    };

}