class ProductManager {

    constructor () {
        this.products = [];
        this.newID = 0;
    }

    addProduct (title, description, price, thumbnail, stock) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            stock,
            id : this.#newID(),
        };
        this.products.push(product);
    }

    #newID(){
        let initialID = 0;
        this.products.map((product) => {
            if(product.id > initialID) initialID = product.id;
        });
        return initialID;
    }


    getProducts (){
        return this.products;
    }

    getProductByID (productID){
        const productByID = this.products.find((prod) => prod.productID === productID)
        if(productByID){
            console.log(productByID)
        } else {
            console.log('Product does not exist')
        }
    }

}

const productManager = new ProductManager();

productManager.addProduct('Bombi Valkyria', 'Bombi tiro alto', 2000, 'bombivalkiria.jpg', 5);
productManager.addProduct('Bombi Volados', 'Bombi tiro alto con volados', 2200, 'bombivolados.jpg', 7);
productManager.addProduct('Corpi Valkyria', 'Corpiño tipo top', 3000, 'corpivalkyria.jpg', 9);
productManager.addProduct('Corpi Heavy Metal', 'Corpiño engomado tipo top', 3500, 'corpivalkyria.jpg', 11);

console.log(productManager.products);

productManager.getProductByID(2);
productManager.getProductByID(5);