import {
    getAllService,
    getByIDService,
    addService,
    updateService,
    deleteByIDService,
    getByKeyService
} from '../services/productServices.js';

export const getAllController = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const docs = await getAllService(page, limit);
        const prevLink = docs.hasPrevPage ? `http://localhost:8080/products?page=${docs.prevPage}` : null
        const nextLink = docs.hasNextPage ? `http://localhost:8080/products?page=${docs.nextPage}` : null
        const productsFile = {
            status: "success",
            payload: docs.docs,
            totalPages: docs.totalPages,
            prevPage: docs.prevPage,
            nextPage: docs.nextPage,
            hasPrevPage: docs.hasPrevPage,
            hasNextPage: docs.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        }    
        res.json('products', {productsFile}); 
    } catch (error) {
        next(error)
    }
};

export const getByIDController = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const docs = await getByIDService(pid);
        if(!docs){
            throw new Error('ID does not exist!')
        } else{
            res.json(docs)
        };
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
        if(!newDoc){
            throw new Error('One of the fields is incorrect, please verify...')
        } else{
            res.json(newDoc)
        };
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
        res.joson(prodUpdated);
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

export const getByKeyController = async (req, res, next) =>{
    try {
        const {key} = req.params;
        const {value} = req.params;
        const productByKey = await getByKeyService (key, value)
        if(!productByKey) throw new Error ("Product not found!")
        res.json(productSearched)
    } catch (error) {
        next(error)
    };
};