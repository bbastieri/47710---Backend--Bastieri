import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required:true },
    lastName: { type: String, required:true },
    email: { type: String, required:true, unique: true },
    age: { type: Number, required:true },
    password: { type:String, required:true, index:true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'carts', default: [] }],
    role: { type:String, default:'user' },
    githubUser: { type: Boolean, required:true, default:false },
    prodCreator: { type: Boolean, default: false },
    documents: [{ name: { type: String }, reference: { type: String } }],
    lastConnection: { type: Date }
});

UserSchema.pre('find', function(){
    this.populate('cart')
});

export const UserModel = (
    'users',
    UserSchema
);

