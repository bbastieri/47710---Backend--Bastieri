import CartDaoMongoDB from "../dao/mongoDB/cartDaoMongoDB.js";

const cartDaoMongoDB = new CartDaoMongoDB();

 export const getAllCartsService = async () => {
    try {
      const docs = await cartDaoMongoDB.getAllCarts();
      return docs;
    } catch (error) {
          console.log(error);
    }
  };

 export const getCartByIdService = async (cid) => {
    try {
      const documentByID = await cartDaoMongoDB.getCartByID(cid);
      if (!documentByID)
        return 'The cart does not exist!';
      else return doc;
    } catch (error) {
          console.log(error);
    }
  };  

 export const createCartService = async (obj) =>{
    try {
        const newCart = await cartDaoMongoDB.createCart(obj);
        return newCart;
    } catch (error) {
        console.log(error);
    }
  };
 
  export const addToCartService = async (cid, pid) =>{
    try {
        const documentAdded = await cartDaoMongoDB.addToCart(cid, pid);
        return documentAdded;
    } catch (error) {
        console.log(error);
    }
  };
  
 export const deleteByIDService = async (cid) =>{
    try {
        const cartDeleted = await prodDaoMongoDB.deleteCartByID(cid)
        return cartDeleted
    } catch (error){
        console.log(error)
    }
 };