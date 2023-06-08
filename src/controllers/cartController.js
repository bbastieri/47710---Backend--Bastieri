import {
    getAllCartsService,
    getCartByIdService,
    createCartService,
    addToCartService,
    deleteFromCartService,
    deleteCartByIDService,
    updateProdQuantityService
} from '../services/cartServices.js'

export const getAllController = async (req, res, next) => {
    try {
        const docs = await getAllCartsService();
        res.json(docs)
    } catch (error) {
        next(error);
    }
};

export const getByIDController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const docs = await getCartByIdService((cid));
        res.json(docs)
    } catch (error) {
        next(error);
    }
};

export const createCartController = async (req, res, next) => {
    try {
        const docs = await createCartService();
        res.json(docs)
    } catch (error) {
        next(error);
    }
};

export const addToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await addToCartService(cid,pid);
        res.json(product)
    } catch (error) {
        next(error);
    }
};

export const deleteCartByIDController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDeleted = await deleteCartByIDService(cid);
        res.json(cartDeleted);
    } catch (error) {
        next(error);
    }
};

export const deleteFromCartController = async (req, res, next) => {
    try {
        const { cid, pid} = req.params;
        const productDeleted = await deleteFromCartService(cid, pid);
        res.json(productDeleted)    
    } catch (error) {
        next (error)
    }
};

export const updateProdQuantityController = async (req, res, next) => {
    try {
       const {cid, pid} = req.params
       const { quantity } = req.body
       const product = await updateProdQuantityService(cid, pid , quantity)
       res.json(product)
    } catch (error) {
        next(error);
    }
}