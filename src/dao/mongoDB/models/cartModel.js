import mongoose from "mongoose";

const cartSchema = new mongoose.Schema ({
    title: { type: String, required: true},
    totalPrice: { type: Number, required: true},
});

export const CartModel = mongoose.model(
    'cart',
    cartSchema
);