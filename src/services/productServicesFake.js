import { ProductsModelFake } from "../dao/mongoDB/models/productsModelFake.js";
import { generateProduct } from "../utils/faker.js";
import { loggerDev } from "../utils/logger.js"

export const createProduct = async (cant = 100) => {
    try {
        const prodArray = []
        for (let i = 0; i < cant; i++) {
        const prod = generateProduct();
        prodArray.push(prod);
    }
    const product = await ProductsModelFake.create(prodArray)
    return product;        

    } catch (error){
      loggerDev.error(error.message)
      throw new Error (error)
    }
};

export const getProducts = async() => {
    try {
      const products = await ProductsModelFake.find({});
      return products;
    } catch (error) {
      loggerDev.error(error.message)
      throw new Error(error)
    }
  };
