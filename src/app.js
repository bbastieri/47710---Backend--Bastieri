import express from 'express';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js'
import { Server } from 'socket.io';
import ProductManager from './managers/productManager.js';
const productManager = new ProductManager('./products.json');
import './db/db.js'

const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname +'/views');
app.use ('/', viewsRouter);
   
const httpServer = app.listen(8080, ()=>{
    console.log(`Server is listening in port 8080...`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) =>{
    console.log(`Client connected: ${socket.id}`)

    socket.on('newProduct', async(product) =>{
        await productManager.addProduct(product)
        socketServer.emit('arrayProducts', await productManager.getProducts())
    });
});