import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const productManager = new ProductManager('./products.json')

router.get('/', async (req,res)=>{
    try {
        const products = await productManager.getProducts();
        res.render('home', {products})
    } catch (error) {
        console.log(error)
    }
})

router.get('/realTimeProducts', async (req, res)=>{
    try{
        const products  = await productManager.getProducts();
        res.render('realTimeProducts', {products})
    } catch (error) {
        console.log(error)
    }
})

export default router;