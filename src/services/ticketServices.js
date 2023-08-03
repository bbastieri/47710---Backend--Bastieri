import TicketDao from "../dao/mongoDB/ticketDao.js";
import ProductDao from "../dao/mongoDB/productDao.js";
import CartDao from "../dao/mongoDB/cartDao.js";

const ticketDao = new TicketDao();
const productDao = new ProductDao();
const cartDao = new CartDao();

let codeCounter = 1;

function generateCode () {
    const counter = codeCounter;
    codeCounter ++;
    const code = `TKT-${counter.toString().padStart(6, '0')}`;
    return code
}; 

export default class TicketService {
    async createTicket (cid, uid) {
        try{
            const cart  = await cartDao.getCartByID(cid).populate('products.product')
            if(!cart) {
                throw new Error ('Cart not found')
            }

            const productsNotAvailable =  [];

            for (const item of cart.products){
                const product = item.product;
                const quantityRequested = item.quantity;
                if (product.stock >= quantityRequested){
                    product.stock -= quantityRequested;
                    await product.save();
                } else {
                    productsNotAvailable.push(product._id)
                }
             }

            if (productsNotAvailable.length ===0) {
                cart.purchased = true;
                await cart.save()
                const ticketData = {
                    code: generateCode(),
                    purchase_datetime: new Date(),
                    amount: cart.totalAmount,
                    purchaser: uid
                };
                return ticketDao.createTicket(ticketData)
            } else {
                return ({productsNotAvailable});
            }
        } catch (error) {
            throw new Error(error) 
        }
    }
};