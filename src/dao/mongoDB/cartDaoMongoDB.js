import { CartModel } from "./models/cartModel.js";
import { ProductsModel } from "./models/productsModel.js"

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

    async addToCart (cid, pid) {
        try{
            const findCart = await CartModel.findById(cid);
            const allProducts = await ProductsModel.find();
            const findProdByID = allProducts.find((prod)=> prod.id === prod)
            if(!findProdByID){
                throw new Error ('The product does not exist!')
            }else{
                if(findCart){
                    const existingProduct = findCart.product.find((product) => product.product === pid);
                    if (!existingProduct) {
                        const newProduct = {
                          quantity: 1,
                          product: pid,
                        };
                        findCart.product.push(newProduct);
                        await CartModel.findByIdAndUpdate({ _id: cid }, { $set: findCart });
                        return findCart;
                      }else {
                        const indexProduct = findCart.product.findIndex(elemento => elemento.product === pid);
                        findCart.product[indexProduct].quantity += 1;
                        await CartModel.findByIdAndUpdate({ _id: cid }, { $set: findCart });
                        return findCart;
                      }
                }else{
                    throw new Error('The cart does not exist!');
                }
            }
        }catch (error){
            console.log(error)
        }
    }

    async deleteCartByID (cid) {
        try{
            const response = await ProductsModel.findByIdAndDelete(cid);
            return response;
        }catch (error) {
            console.log(error)
        }
    };


}