import mongoose from "mongoose";

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema ({
    cart: { type: Array, default: []},
    totalPrice: { type: Number, default: true}
});

export const CartModel = mongoose.model(
    cartCollection,
    cartSchema
);