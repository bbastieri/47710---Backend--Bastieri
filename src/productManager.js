const fs = require ('fs');

class ProductManager {

    constructor () {
        this.path = './products.json'
    }

    async getProducts (){
        try {
            if (fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf8');
                const productsJS = JSON.parse(products);
                return productsJS;
            } else{
                return [];
            }

        } catch (error){
            console.log(error)
        }
    }

    async addProduct (title, description, price, thumbnail, code, stock) {
        try {
            const productsList = await this.getProducts();
            const productCode = productsList.find((product) => product.code === code);
            if (productCode) {
                console.log ('This product already exists.')
            } else{
                const lastProd = productsList[productsList.length - 1];
                const newID = productCode ? lastProd.id +1 : 1;
                const product = {
                    id : newID,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
            }
            productsList.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsList));
            }

        } catch (error){
        console.log(error);
        } 
    }

    async deleteProduct(idProduct) {
        try {
          const productsList = await this.getProducts();
          const idDelete = productsList.findIndex((product) => product.id === idProduct);
        
          if(idDelete < 0){
            console.log ('ID not found');
          } else{
            const index = productsList.indexOf(idDelete)
            productsFile.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productsList));
            console.log(`Deleted product: ID "${idProduct}"`);
          } 
        } catch (error){
            console.log(error)
        }  
    }

    async updateProduct (idProduct, toBeUpdated) {
        try{
          const productsList = await this.getProducts();
          const idUpdate = productsList.findIndex ((product) => product.id === idProduct);
          
          if (idUpdate < 0){
            console.log ('ID not found');
          } else {
            const productUpdated = {
                id: idProduct,
                ...productsList[idUpdate],
                ...toBeUpdated,
            };
            productsList[idUpdate] = productUpdated;
            await fs.promises.writeFile(this.path, JSON.stringify(productsList));
            console.log(`Product ID "${idProduct}" successfully updated`);    
          }
        } catch (error){
            console.log(error);
        }
    }

    async getProductByID (idProduct){
        try {
          const productsList = await this.getProducts();
          const productByID = productsList.find(product => product.id === idProduct);
          return productByID;   

        } catch (error){
            console.log(error);
        }
    }

}

const productManager = new ProductManager();

const test = async () => {
    const get1 = await productManager.getProducts();
    console.log('First query:', get1);
    await productManager.addProduct('Bombi Valkyria','Bombi tiro alto', 2000,'bombivalkyria.jpg','bombivalkyria',5);
    const get2 =  await productManager.getProducts();
    console.log('Second query:', get2)
    const get3 = await productManager.getProductByID(1);
    console.log ('Product:', get3);
    await productManager.deleteProduct(2);
}

test();

export default ProductManager;
