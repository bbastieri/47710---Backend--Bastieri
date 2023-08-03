import { CartModel } from "./models/cartModel.js";
import { ProductsModel } from "./models/productsModel.js";
import { UserModel } from "./models/usersModel.js"

export default class CartDao {

    async getAllCarts() {
        try{
            const response = await CartModel.find({})
            return response
        }catch (error){
            throw new Error(error)
        }
    };
    
    async createCart () {
        try{
            const response = await CartModel.create({})
            return response;
        } catch(error) {
            throw new Error(error)
        }
    };

    async getCartByID (cid) {
        try{
            const response = await CartModel.findOne({_id: cid}).populate('products._id');
            return response;
        }catch(error) {
            throw new Error(error)
        }
    };


    async addToCart (cid, pid) {
        try{
            const cartFinder = await CartModel.findById(cid);
            if(!cartFinder) throw new Error ('Cart not found!')
            const existingProduct = cartFinder.products.find(prod => prod._id === pid)
            if (existingProduct){
                const updtQuantity = existingProduct.quantity + 1
                await CartModel.updateOne(
                    {_id: cid},
                    {$set: {'products.$.quantity': updtQuantity}}
                );
            } else {
                await CartModel.findOneAndUpdate(
                    {_id: cid},
                    {$push: {products: {_id: prodId, quantity: 1}}},
                )
            };
            const cartUpdate = await CartModel.findById(cid).populate('products._id')
            return cartUpdate            
        }catch (error){
            throw new Error(error)
        }
    };

    async deleteProdFromCart (pid, cid){
        try {
            const cartFinder = await CartModel.findById(cid);
            const existingProduct = cartFinder.products.find(prod => prod._id === pid);
            if(!existingProduct){
                throw new Error('The product you are trying to remove does not exist')
            } else{
                if(existingProduct.quantity > 1){
                    const updtQuantity = existingProduct.quantity - 1
                    await CartModel.updateOne(
                        {_id: cid, 'products._id': pid},
                        {$set: {'products.$.quantity': updtQuantity}}
                    );
                } else{
                    await CartModel.findOneAndUpdate(
                        {_id: cid},
                        {$pull: {products: {_id: pid}}},
                    );
                };
            };
            const cartUpdate = await CartModel.findById(cid).populate('products._id')
            return cartUpdate
        } catch (error) {
            throw new Error(error)
        };
    };

    async updateProductQuantity (cid, pid, newQuantity) {
        try {
            const cartFinder = await CartModel.findById(cid);
            const existingProduct = cartFinder.products.find(prod => prod._id === pid);
            if(!existingProduct){
                throw new Error('the product you are trying to update does not exist')
            } else
                existingProduct.quantity = newQuantity
                if(existingProduct.quantity > 1){
                    await CartModel.updateOne(
                        {_id: cid, 'products._id': pid},
                        {$set: {'products.$.quantity': newQuantity}}
                    );
                } else{
                    await CartModel.findOneAndUpdate(
                        {_id: cid},
                        {$pull: {products: {_id: pid}}},
                    );
                };
                const cartUpdate = await CartModel.findById(cid).populate('products._id')
                return cartUpdate
            } catch (error) {
                throw new Error(error)
        };
    };

    async getCartByUser(uid) {
        try {
            const user = await UserModel.findOne({ _id: uid }).populate('carts');
            if (user) {
                if (user.cart) {
                    return user.cart;
                } else {
                    return { message: 'Cart user not found' };
                }
            } else {
                return { message: 'User not found' };
            }
        } catch (error) {
            throw new Error(error)
        }
    };

}