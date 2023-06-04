import express from 'express';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js'
import { Server } from 'socket.io';
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

socketServer.on('connection',  async (socket) =>{
    console.log(`Client connected: ${socket.id}`)

    socket.on('newProduct', async(product) =>{
        await productManager.addProduct(product)
        socketServer.emit('arrayProducts', await productManager.getProducts())
    });

    socketServer.emit("messages", await messagesManager.getAllMessages());

    socket.on("disconnect", () => {
        console.log("¡🔴 User disconnect!");
    });

    socket.on("newUser", (userName) => {
        console.log(`${userName} is logged in`);
    });

    socket.on("chat:message", async ({ userName, message }) => {
        await messagesManager.createMessage(userName, message);
        socketServer.emit("messages", await messagesManager.getAllMessages());
    });

    socket.on("newUser", (userName) => {
        socket.broadcast.emit("newUser", userName);
    });

    socket.on("chat:typing", (data) => {
        socket.broadcast.emit("chat:typing", data);
    });    
});