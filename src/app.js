import express from 'express';
import productRouter from './routes/productRouter';
import cartRouter from './routes/cartRouter';

const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/static', express.static('public'));
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', async (req,res)=>res.send ('HOME')); 
   
app.listen(8080, ()=>{
    console.log('Server is running...')
})