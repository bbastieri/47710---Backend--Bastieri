import express from 'express';
import { __dirname } from './utils/path.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', async (req,res)=>res.send ('HOME')); 
   
app.listen(8080, ()=>{
    console.log('Server is running...')
})