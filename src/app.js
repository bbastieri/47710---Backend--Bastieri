import express from 'express';
import ProductManager  from './productManager.js'

const app = express ();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const productManager = new ProductManager('./products.json')
const test = async () => {
    await productManager.addProduct('Bombi Valkyria','Bombi tiro alto',2000,'bombivalkyria.jpg','bombivalky',10);
    await productManager.addProduct('Bombi Fairy','Bombi tipo retro con volados ',2000,'bombifairy.jpg','bombifairy',15)
    await productManager.addProduct('Corpi Heavy Metal','Corpi top ecocuero',2800,'corpiheavymetal.jpg','corpiheavy',15)
}

test ()

app.get('/', async (req,res)=>{
    res.send ('HOME')
}) 

app.get('/products', async (req,res)=>{
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

app.get('/products/:pid', async (req, res) =>{
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
   

app.listen(8080, ()=>{
    console.log('Server is running...')
})