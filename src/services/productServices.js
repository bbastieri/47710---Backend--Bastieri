import ProductDaoMongoDB from "../dao/mongoDB/productDaoMongoDB"; 

const prodDaoMongoDB = new ProductDaoMongoDB();

export const getAllService = async () => {
    try {
        const allDocuments = await prodDaoMongoDB.getProducts();
        return allDocuments;
    } catch (error) {
        console.log(error)
    }
};

export const getByIDService = async (id) => {
    try{
        const documentByID = await prodDaoMongoDB.getProductByID(id);
        if(!documentByID) throw new Error ('Product not found')
        else return documentByID;
    } catch (error) {
        console.log(error)
    }
};

export const addService = async (obj) => {
    try {
        const newProduct = await prodDaoMongoDB.addProduct(obj);
        if(!newProduct) throw new Error ('Validation failed')
        else return newProduct;
    } catch (error) {
        console.log(error)
    }
};

export const updateService = async (id, obj) => {
    try {
        const documentByID = await prodDaoMongoDB.getProductByID(id);
        if(!documentByID) {
            throw new Error ('Product not found')
        }else {
            const productUpdated = await prodDaoMongoDB.updateProduct(id, obj)
            return productUpdated
        }
    } catch (error) {
        console.log(error)
    }
};

export const deleteByIDService = async (id) =>{
    try {
        const productDeleted = await prodDaoMongoDB.deleteProductByID(id)
        return productDeleted
    } catch (error){
        console.log(error)
    }
};

