# API Ecommerce

Esta aplicación fue diseñada durante la cursada de Backend para Coderhouse. En ella se gestionan usuarios, productos y carritos, para así completar un proceso de compra.
En este documento se especificarán endpoints, funciones y métodos de peticiones para su uso.

## Info importante

**URL:** [ http://localhost:3000 ]

## USERS

### Register

+ **Endpoint:** /users/register
+ **Method:** POST
+ **Parameters:**
    - **firstName:** user name (string)
    - **lastName:**: user last name (string)
    - **email:** user email (string)
    - **age:** user age (number)
    - **password:** user password (string)

### Login

+ **Endpoint:** /users/login
+ **Method:** POST
+ **Parameters:**
    - **email:** user email (string)
    - **password:**: user password (string)

### Get All Users

+ **Endpoint:** /users/getAll
+ **Method:** GET

### Delete Users

+ **Endpoint:** /users/delete
+ **Method:** DELETE

### Update Password

+ **Endpoint:** /users/updatePass
+ **Method:** PUT
+ **Parameters:** 
    - **currentPass:** actual Password
    - **newPass:** new Password
    - **confirmNewPass:** confirm new Password

## PRODUCTS
Available only for admin or private users    

### Create Product 

+ **Endpoint:** /products
+ **Method:** POST
+ **Parameters:**
    - **title:** product name (string)
    - **description:**: product description (string)
    - **price:** product price (number)
    - **stock:** available product stock (number)
    - **code:** identification code (string)
    - **status:** product status (boolean)
    - **category:** product category (string)
    - **thumbnails:** product image (string)

### Get All Products

+ **Endpoint:** /products
+ **Method:** GET

### Get By ID

+ **Endpoint:** /products/:pid
+ **Method:** GET

### Update Product

+ **Endpoint:** /products/:pid
+ **Method:** PUT

### Delete Product By ID

+ **Endpoint:** /products/:pid
+ **Method:** DELETE

## CARTS

### Create Cart

+ **Endpoint:** /carts
+ **Method:** POST

### Delete Product From Cart

+ **Endpoint:** /carts/:cid/products/:pid
+ **Method:** DELETE

### Add Product To Cart

+ **Endpoint:** /carts/:cid/products/:pid
+ **Method:** POST

### Update Product Quantity

+ **Endpoint:** /carts/:cid/products/:pid
+ **Method:** PUT
+ **Parameters:**
    - **quantity:** new quantity (number)



