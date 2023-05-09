import { Router } from "express";
import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";

const router = Router();
const cartManager = new CartManager(__dirname + './cart.json')

router.get('/', async (req,res)=>{
    const {limit} = req.query;
    try {
        const cartList = await cartManager.getCarts(limit);
        res.status(200).json(cartList)
    } catch (error) {   
        res.status(404).json({message: error.message})
    }
});

router.get('/:cid', async(req, res)=>{
    try{
        const { cid } = req.params;
        const cartByID = await cartManager.getCartByID(cid);
        if(!cartByID){
            res.status(404).send(`Cart ID ${cid} not found`);
            return;
        }
        const products = await Promise.all(
            cart.products.map (async (product)=>{
                const p = await ProductManager.getProductByID(product.pid);
                return {...product, ...p}
            })
        );
        res.status(200).json(products);
    } catch (error){
        res.status(500).send({message: error.message})
    }
})

router.post('/:cid/product/:pid', async (req, res)=>{
    try{
        const { cid } = req.params;
        const { pid } = req.params
        const cart = await cartManager.getCartByID(cid);
        if(!cart) {
            res.status(404).send({message:`Cart ID ${cid} not found`})
            return
        }
        const index = cart.products.findIndex((product) => product.pid === pid);
        if (index === -1) {
            cart.products.push({pid, quantity:1});
        } else {
            cart.products[index].quantity++;
        }
        await cartManager.addProductToCart(cart, cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

export default router;