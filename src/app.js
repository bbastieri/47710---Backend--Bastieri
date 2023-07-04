import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import './db/db.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import Mongostore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import usersRouter from './routes/usersRouter.js';


const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(cookieParser());

/* ROUTES */

app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use ('/', viewsRouter);

/* HANDLEBARS */

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname +'/views');

/* MONGODB */

const storeOptions = {
    store: new Mongostore ({
        mongoUrl: 'mongodb+srv://bbastieri:Galito01@cluster0.fnqi1b0.mongodb.net/ecommerce?retryWrites=true&w=majority',
        crypto: {
            secret: 'secretPass'
        },
        ttl: 60,
        autoRemove: 'interval',
        autoRemoveInterval: 10,
    }),
    secret: 'secretPass2',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}
app.use(session(storeOptions));

/* PASSPORT */

app.use(passport.initialize());
app.use(passport.session())

/* PORT */   

const httpServer = app.listen(8080, ()=>{
    console.log(`Server is listening in port 8080...`)
});


/* WEBSOCKET */

const socketServer = new Server(httpServer);

socketServer.on('connection',  async (socket) =>{
    console.log(`Client connected: ${socket.id}`)

    socket.on('newProduct', async(product) =>{
        await productManager.addProduct(product)
        socketServer.emit('arrayProducts', await productManager.getProducts())
    });

    socketServer.emit("messages", await messagesManager.getAllMessages());

    socket.on("disconnect", () => {
        console.log("¡User disconnect!");
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