import mongoose from "mongoose";

const productSchemaFake = new mongoose.Schema ({
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true}
});

export const ProductsModelFake =  mongoose.model(
    'productsfake',
    productSchemaFake
);

