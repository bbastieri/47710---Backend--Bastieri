import {
    getAllService,
    getByIDService,
    addService,
    updateService,
    deleteByIDService
} from '../services/productServices.js';

export const getAllController = async (req, res, next) => {
    try {
        const { limit } = req.query;
        const docs = await getAllService(limit);
        res.status(200).send(docs); 
    } catch (error) {
        next(error)
    }
};

export const getByIDController = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const docs = await getByIDService(pid);
        res.status(200).send(docs);
    } catch (error) {
        next(error)
    }
};

export const addController = async (req, res, next) => {
    try {
        const {
            title,
            description,
            price,
            code,
            category,
            stock,
            status = true
        } = req.body;
          
        const newDoc = await addService({
            title,
            description,
            price,
            code,
            category,
            stock,
            status
        });
        res.status(201).json(newDoc);
    } catch (error) {
        next(error)
    }
};

export const updateController = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const {
            title,
            description,
            price,
            code,
            category,
            stock,
            status
        } = req.body;
        await getByIDService(pid);
        const prodUpdated = await updateService(pid, {
            title,
            description,
            price,
            code,
            category,
            stock,
            status
        });
        res.status(200).send(prodUpdated);
    } catch (error) {
        next(error)
    }
};

export const deleteByIDController = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const productDeleted = await deleteByIDService(pid);
        res.status(200).send(productDeleted);
    } catch (error) {
        next(error)
    }
};