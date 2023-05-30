import fs from 'fs';

export default class CartManagerFS {

    constructor (path) {
        this.path = path;
    }

    async #getNewID (){
        let starterID = 0;
        const cart = await this.getCart();
        cart.map ((cart)=>{
            if(cart.cid > starterID) starterID = cart.cid;
        })
        return starterID;
    }

    async getCarts () {
        try {
            if (fs.existsSync(this.path)){    
                const cart = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(cart)
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCartByID (cid) {
        try {
            const cartList = await this.getCarts();
            const cartByID = await cartList.find(cart => cart.cid === cid);
            return cartByID;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart () {
        try{
            const cart = {
                cid: this.#getNewID() + 1,
                products: []
            };
            const cartList = await this.getCarts();
            cartList.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartList));
            return cart;            
        } catch (error){
            console.log(error);
        }    
    }

    async addProductToCart (pid, cid){ 
        try {
            const cart = await this.getCartByID(cid);
            if(cart) {
                const productIndex = cart.products.findIndex(product => product.pid === pid);
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity += 1;
                } else {
                    cart.products.push({product: pid, quantity: 1})
                }
                const cartList = await this.getCarts();
                const cartIndex = cartList.findIndex(cart => cart.cid === cid);
                cartList[cartIndex] = cart;
                await fs.promises.writeFile(this.path, JSON.stringify(cartList))
                return cart
            } else {
                throw new Error (`Cart ID ${cid} not found`)
            }
        } catch (error) {
            console.log(error)
        }
    }
};

