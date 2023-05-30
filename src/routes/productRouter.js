import { Router } from "express";
import { __dirname } from "../path.js";
import ProductManager from "../managers/productManager.js";

const router = Router();
const productManager = new ProductManager(__dirname + './products.json');


router.get('/', async (req,res)=>{
    const {limit} = req.query;
    try {
        const productsList = await productManager.getProducts(limit);
        res.status(200).json(productsList)
    } catch (error) {   
        res.status(404).json({message: error.message})
    }
});

router.get('/:pid', async (req, res) =>{
    try{
        const { pid } = req.params;
        const productByID = await productManager.getProductByID(pid);
        if(productByID){
            res.status(200).json({message:`Product ID ${pid}:`, productByID})
        } else {
            res.status(400).send({message:`Product ID ${pid} not found`})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
});

router.post('/', async (req, res)=>{
    try{
        console.log(req.body);
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.json(newProduct)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.put('/:pid', async (req, res)=>{
    try{
        const product = req.body;
        const { pid } = req.params;
        const productByID = await productManager.getProductByID(Number(pid));
        if (productByID){
            await productManager.updateProduct(Number(pid), product);
            res.status(200).json({message:`Product ID ${pid} updated successfully`})
        } else {
            res.status(400).json({message:'Product not found!'})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.delete('/:pid', async (req, res)=>{
    try{
        const { pid } = req.params;
        const productsList = await productManager.getProducts();
        const toBeDeleted = productsList.find(prod => prod.pid === (Number(pid)));
        if (toBeDeleted) {
            await productManager.deleteProduct(Number(pid));
            res.send(200).json({message:`Product ID ${pid} deleted successfully`})
        } else {    
            res.status(400).json({message:'Product not found!'})
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

export default router;