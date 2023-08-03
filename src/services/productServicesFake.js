import { ProductsModelFake } from "../dao/mongoDB/models/productsModelFake.js";
import { generateProduct } from "../utils/faker.js";

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
        throw new Error (error)
    }
};

export const getProducts = async() => {
    try {
      const products = await ProductsModelFake.find({});
      return products;
    } catch (error) {
      throw new Error(error)
    }
  };
