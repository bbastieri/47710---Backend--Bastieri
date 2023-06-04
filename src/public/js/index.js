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

        title.innerText = product.title;
        pDescription.innerText = product.description;
        pCode.innerText = product.code;
        pPrice.innerText = product.price;

        div.appendChild(title);
        div.appendChild(pDescription);
        div.appendChild(pCode);
        div.appendChild(pPrice);

        divProduct.appendChild(div);

    });
})

let userName = null;

if (!userName) {
  Swal.fire({
    title: "¡Welcome to chat!",
    text: "Insert your username here",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Your username is required";
      }
    },
  }).then((input) => {
   userName = input.value;
    socket.emit("newUser", userName);
  });
}

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    userName,
    message: message.value,
  });
  message.value = "";
});

socket.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((msg) => {
      return `<p style="font-family: 'Edu NSW ACT Foundation', cursive; font-size: 1.3em"><strong style="text-decoration: underline">${msg.userName}</strong>: '${msg.message}'</p>`;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

socket.on("newUser", (userName) => {
  Toastify({
    text: `🟢 ${userName} is logged in`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)"
    },
    onClick: ()=>{}
  }).showToast();
});

message.addEventListener("keyup", () => {
  socket.emit("chat:typing", userName);
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = data
    ? `<p style="padding: 10px 25px; margin: 0; font-family: 'Amatic SC', cursive; font-size: 1.4em"> ${data} is writing a message... </p>`
    : "";
});