import mongoose from "mongoose";

const cartCollection = 'cart';

const CartSchema = new mongoose.Schema ({
    products: [ 
        { type: mongoose.Schema.Types.Mixed, 
          required: true, ref:'products', 
          quantity: { type: Number, default: 1 }
        }
    ]
});

CartSchema.pre('find', function(){
    this.populate('products')
})

export const CartModel = mongoose.model(
    cartCollection,
    CartSchema
);