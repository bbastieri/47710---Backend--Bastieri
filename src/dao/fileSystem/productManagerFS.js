import fs from 'fs';

export default class ProductManager {

    constructor (path) {
        this.path = path
    }

    async #getNewID(){
        let starterID = 0;
        const productsList = await this.getProducts();
        productsList.map((product)=>{
            if (product.pid > starterID) starterID = product.pid;
        });
        return starterID;    
    }

    async getProducts (limit){
        try {
            if (fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf8');
                const productsJS = JSON.parse(products);
                if (limit) {
                    return productsJS.slice(0, limit)
                } else {
                    return productsJS;
                }
            } else {
                return []
            }

        } catch (error){
            console.log(error)
        }
    }

    async getProductByID (pid){
        try {
          const productsList = await this.getProducts();
          const productByID = productsList.find(product => product.pid === pid);
          return productByID;   
        } catch (error){
            console.log(error);
        }
    }

    async addProduct (obj) {
        try {
            const product = {
                pid : await this.#getNewID() + 1,
                ...obj
            };
            const productsList = await this.getProducts();
            productsList.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsList))        
            return product
        } catch (error){
            console.log(error);
        } 
    }

    async deleteProduct(pid) {
        try {
          const productsList = await this.getProducts();
          const idDelete = productsList.findIndex((product) => product.pid === pid);
        
          if(idDelete < 0){
            console.log ('ID not found');
          } else{
            const index = productsList.indexOf(idDelete)
            productsFile.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productsList));
            console.log(`Deleted product: ID "${pid}"`);
          } 
        } catch (error){
            console.log(error)
        }  
    }

    async updateProduct (pid, obj) {
        try{
          const productsList = await this.getProducts();
          const idUpdate = productsList.findIndex ((product) => product.id === pid);
          if (idUpdate < 0){
            console.log (`ID ${pid} not found`);
          } else {
            const productUpdated = {
                id: pid,
                ...productsList[idUpdate],
                ...obj,
            };
            productsList[idUpdate] = productUpdated;
            await fs.promises.writeFile(this.path, JSON.stringify(productsList));
            console.log(`Product ID "${pid}" successfully updated`);    
          }
        } catch (error){
            console.log(error);
        }
    }
}

