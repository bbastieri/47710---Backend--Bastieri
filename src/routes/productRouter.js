import { Router } from "express";
import ProductManager from "../managers/productManager";

const router = Router();
const productManager = new ProductManager('./products.json');


router.get('/products', async (req,res)=>{
    try {
        const productsFile = await productManager.getProducts();
        const limit = req.query.limit ? parseInt(req.query.limit) : 0;
        if (limit>0){
            const selectedProducts = productsFile.slice(0, limit);
            const remainingProducts = productsFile.slice(limit);
            res.status(200).json({selectedProducts, remainingProducts})
        } else {
            res.status(200).json(productsFile)
        }
    } catch (error) {   
        res.status(404).json({error})
    }
});

router.get('/products/:pid', async (req, res) =>{
    try{
        const productID = parseInt(req.params.pid);
        const productByID = await productManager.getProductByID(productID);
        if(productByID){
            res.status(200).json({message:`Product ID ${pid}:`, productByID})
        } else {
            res.status(400).send({message:`Product ID ${pid} not found`})
        }

    } catch (error) {
        res.status(400).json({error})
    }
})

export default productRouter;