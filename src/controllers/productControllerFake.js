import {
    createProduct,
    getProducts
} from '../services/productServicesFake.js';
import HttpResponse from '../utils/httpResponse.js';

const httpResponse = new HttpResponse();

export const createController = async (req, res) => {
    const { quantity } = req.query;
    try{
        const docs = await createProduct(quantity);
        res.status(200).json({ productsfake: docs});
    } catch (error) {
        return httpResponse.ServerError(res, error)
    }
};

export const getController = async (req, res) => {
    try {  
        const docs = await getProducts();
        res.status(200).json({productsfake: docs})
    } catch (error) {
        return httpResponse.ServerError(res, error)
    }
};