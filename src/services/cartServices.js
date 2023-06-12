import CartDao from '../dao/mongoDB/cartDao.js'

const cartDao = new CartDao();

export const getAllCartsService = async () => {
    try {
      const docs = await cartDao.getAllCarts();
      return docs;
    } catch (error) {
          console.log(error);
    }
};

export const getCartByIdService = async (cid) => {
    try {
      const documentByID = await cartDao.getCartByID(cid);
      if (!documentByID)
        return 'The cart does not exist!';
      else return doc;
    } catch (error) {
          console.log(error);
    }
};  

export const createCartService = async () =>{
    try {
        const newCart = await cartDao.createCart();
        return newCart;
    } catch (error) {
        console.log(error);
    }
};
 
export const addToCartService = async (cid, pid) =>{
    try {
        const documentAdded = await cartDao.addToCart(cid, pid);
        return documentAdded;
    } catch (error) {
        console.log(error);
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
      console.log (error)
    }
};

export const updateProdQuantityService = async (cid, pid, quantity) =>{
    try {
      const prod = await cartDao.updateProdQuantityService(cid, pid, quantity)
      if (!prod) {
        throw new Error ('Product not found')
      }
    } catch (error) {
      console.log(error)
    }
};

