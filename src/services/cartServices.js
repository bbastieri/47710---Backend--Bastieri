import CartDao from '../dao/mongoDB/cartDao.js';
import HttpResponse from '../utils/httpResponse.js';
import { loggerDev } from '../utils/logger.js';

const cartDao = new CartDao();
const httpResponse = new HttpResponse();

export const getAllCartsService = async () => {
    try {
      const docs = await cartDao.getAllCarts();
      return docs;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const createCartService = async () =>{
    try {
        const newCart = await cartDao.createCart();
        return newCart;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const getCartByIdService = async (cid) => {
    try {
      const documentByID = await cartDao.getCartByID(cid);
      if (!documentByID)
        return 'The cart does not exist!';
      else return doc;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};  

 
export const addToCartService = async (cid, pid, uid) =>{
    try {
        const docAdded = await cartDao.addToCart(cid, pid, uid);
        return docAdded;
    } catch (error) {
      loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const deleteFromCartService = async (cid, pid) => {
    try {
      const prodDeleted = await cartDao.deleteProdFromCart(cid, pid);
      if(!prodDeleted){
        throw new Error ('Product not found')
      }
      return prodDeleted
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const updateProdQuantityService = async (cid, pid, quantity) =>{
    try {
      const prod = await cartDao.updateProdQuantityService(cid, pid, quantity)
      if (!prod) {
        return httpResponse.NotFound(res.error)
      }
      return prod;
    } catch (error) {
      loggerDev.error(error.message)
      throw new Error (error)
    }
};

export const getCartByUserService = async (uid) => {
  try {
    const documentByID = await cartDao.getCartByUser(cid);
    if (!documentByID)
      return 'The cart does not exist!';
    else return doc;
  } catch (error) {
      loggerDev.error(error.message)
      throw new Error (error)
  }
};


