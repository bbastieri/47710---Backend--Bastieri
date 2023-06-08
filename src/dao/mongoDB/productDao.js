import { ProductsModel } from "./models/productsModel.js";

export default class ProductDao {

    async getAllProducts (page=1, limit=10) {
        try{
            const response = await ProductsModel.paginate({},{page, limit});
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async getProductByID (pid) {
        try{
            const response = await ProductsModel.findById(pid);
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

    async updateProduct (pid, obj) {
        try{
            await ProductsModel.updateOne({_id: pid, obj});
            return obj;
        }catch (error) {
            console.log(error)
        }
    };

    async deleteProductByID (pid) {
        try{
            const response = await ProductsModel.findByIdAndDelete(pid);
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async getProductByKey (key, value) {
        try {
            const query = {};
            query[key] = value;
            const response = await ProductsModel.find(query)
            return response
        }catch (error) {
            console.log(error)
        }
    };
}    