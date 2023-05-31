import { CartModel } from "./models/cartModel";

export default class CartDaoMongoDB {

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