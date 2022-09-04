const socket = io()

//DATOS DEL PRODUCTO
const formProducts = document.querySelector('#formProducts')
const idProduct = document.querySelector('#idProduct')
const nameProduct = document.querySelector('#nameProduct')
const priceProduct = document.querySelector('#priceProduct')
const imgProduct = document.querySelector('#imgProduct')
const tableProducts = document.querySelector('#tableProducts')

//DATOS DEL USUARIO
const formMessages = document.querySelector('#formMessages')
const emailUser = document.querySelector('#emailUser')
const messageUser = document.querySelector('#messageUser')
const messagesAll = document.querySelector('#messagesAll')

function sendMessage() {

    try {
        const email = emailUser.value
        const message = messageUser.value

        socket.emit('client:message', { email, message })
    } catch (error) {
        console.log(`Error de comunicación ${error}`);
    }
}

function renderMessage(messageData) {
    try {

        const html = messageData.map(message => {

            return (
                `<div>
                    <strong style="" >${message.email}</strong>
                    /* <span style="">[${message.date}]</span>
                    <i style="">${message.message}</i> */
                </div>`

            )
        }).join('')

        messagesAll.innerHTML = html
        messageUser.value = ""

    } catch (error) {
        console.log(`Error de comunicación ${error}`);
    }
}

function sendProducts() {
    try {
        const nombre = nameProduct.value
        const precio = priceProduct.value
        const url = imgProduct.value

        socket.emit('server:products', { nombre, precio, url })

    } catch (error) {
        console.log(`Error de comunicación ${error}`)
    }
}
async function renderProducts(products) {
    
    const html = products.map(prod => {

        return (
            `
                <tr>
                    <td style="" >
                        ${prod._id}
                    </td>
                    <td style="" >
                        ${prod.nombre}
                    </td>
                    <td style="">
                        ${prod.precio}
                    </td>
                    <td style="">
                        <img src=${prod.url} alt=${prod.nombre} style="width: 35px"/>
                    </td>
                </tr>
            `

        )
    }).join('')

    tableProducts.innerHTML = html
    tableProducts.value = ""

    formProducts.reset()
}

//Escuchamos el evento Submit cuando se carga un producto nuevo
formProducts.addEventListener('submit', e => {
    e.preventDefault()
    sendProducts()
})

//Escuchamos el evento Submit cuando se envía un mensaje nuevo
formMessages.addEventListener('submit', e => {
    e.preventDefault()
    sendMessage()
})

socket.on('server:products', renderProducts)
socket.on('server:message', renderMessage)
