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
    let limit = req.query.limit;
    const products = await productManager.get()
    if(!limit){
        return res.json({products})
    }
    limit = limit < products.length ? limit : products.length;
    const array = [];
    for(let i=0; i<limit; i++){
        array.push(products[i]);
    }
    return res.json({array});    
})

app.get('.products/:pid', async (req, res)=>{
    const prodID = parseInt(req.params.pid);
    const product = await productManager.getById(prodID);
    if(product == -1) return res.status(404).send(`Product not found`);
    return res.json({product});
})


app.listen(8080, ()=>{
    console.log('Server is running...')
})