import mongoose from "mongoose";

const connectionString = 'mongodb+srv://bbastieri:Galito01@cluster0.fnqi1b0.mongodb.net/ecommerce?retryWrites=true&w=majority';

try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
} catch (error) {
    console.log(error);
}