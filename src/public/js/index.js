const socketClient = io();

const form = document.getElementById('form');
const inputId = document.getElementById('id')
const inputName = document.getElementById('name');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const divProduct = document.getElementById('dicProduct');

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const description = inputDescription.value;

    socketClient.emit('newProduct', { name, price, description });
};

socketClient.on('arrayProducts', (array) => {   
    divProduct.innerHTML = '';
    array.forEach(product => {
        const div = document.createElement('div')
        const title = document.createElement('p');
        const pDescription = document.createElement('p');
        const pCode = document.createElement('p');
        const pPrice = document.createElement('p');

        title.innerText = product.name;
        pDescription.innerText = product.description;
        pCode.innerText = product.code;
        pPrice.innerText = product.price;

        div.appendChild('title');
        div.appendChild('pDescription');
        div.appendChild('pCode');
        div.appendChild('pPrice')

        divProduct.appendChild(div);

    });
})