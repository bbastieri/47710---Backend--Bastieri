import { ProductsModel } from "./models/productsModel";

export default class ProductManagerMongoDB {

    async getProducts () {
        try{
            const response = await ProductsModel.find({});
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async getProductByID (id) {
        try{
            const response = await ProductsModel.findById(id);
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async addProduct (obj) {
        try{
            const response = await ProductsModel.create(obj);
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async updateProduct (id, obj) {
        try{
            await ProductsModel.updateOne({_id: id, obj});
            return obj;
        }catch (error) {
            console.log(error)
        }
    };

    async deleteProductByID (id) {
        try{
            const response = await ProductsModel.findByIdAndDelete(id);
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async deleteProducts () {
        try{
            const response = await ProductsModel.deleteMany({});
            return response;
        }catch (error) {
            console.log(error)
        }
    };

}