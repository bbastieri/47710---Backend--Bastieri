import mongoose from "mongoose";

const productSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: number, required: true },
    code: { type: String, required: true },
    stock: { type: number, required: true }
});

export const ProductsModel = mongoose.model(
    'products',
    productSchema
);
