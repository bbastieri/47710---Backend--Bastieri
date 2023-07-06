import mongoose from "mongoose";

const usersCollection = 'users';

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    age: {type: Number, required:true},
    password: {type:String, required:true, index:true},
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'cart', default: []}],
    role: {type:String, default:'user'},
    githubUser: {type: Boolean, required:true, default:false}
});

export const UserModel = (
    usersCollection,
    UserSchema
);

