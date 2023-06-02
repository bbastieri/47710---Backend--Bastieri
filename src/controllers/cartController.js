import {
    getAllCartsService,
    getCartByIdService,
    createCartService,
    addToCartService,
    deleteByIDService
} from '../services/cartServices.js'

export const getAllController = async (req, res, next) => {
    try {
        const docs = await getAllCartsService();
        res.status(200).send({status: "success", message:"Cart found", payload: docs})
    } catch (error) {
        next(error);
    }
};

export const getByIDController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const docs = await getCartByIdService(Number(cid));
        res.status(200).json(docs);
    } catch (error) {
        next(error);
    }
};

export const createCartController = async (req, res, next) => {
    try {
        const docs = await createCartService();
        res.status(201).send(docs)
    } catch (error) {
        next(error);
    }
};

export const addToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await addToCartService(cid,pid);
        if (product) {
          res.status(201).send({status: "success",mensaje: 'Product successfully added to cart!',payload: product});
        } else {
          res.status(404).send({status: "error",mensaje:'The product or cart not found!'});
        }
    } catch (error) {
        next(error);
    }
};

export const deleteByIDController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const productDeleted = await deleteByIDService(cid);
        res.status(200).send(productDeleted);
    } catch (error) {
        next(error);
    }
}