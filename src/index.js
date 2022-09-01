const express = require('express')
const engine = require('ejs-mate')
const routes = require('./routes/index')
const http = require('http')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const { Server: IOServer } = require('socket.io')
const os = require('os')
const cluster = require('cluster')

//Inicializaciones
const app = express()
require('./database')
require('./passport/local-auth')


/* Desafio 29 */
const cpus = os.cpus()
const PORT = Number(process.argv[2]) || 3000
const iscluster = process.argv[3] === "cluster"

// 


const server = http.createServer(app)
const io = new IOServer(server)

//Desafio 29: Si estamnos en modo cluster mapeamos los cpus y creamos nuevos cluster cada vez que muera cada uno
if (iscluster && cluster.isPrimary) {
    cpus.map(() => {
        cluster.fork()
    })

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} muerto`)
        cluster.fork()
    })
} else {
    // Si estamos en modo Fork escuchamos el puerto
    //Congiguracion
    app.use(express.static(path.join(__dirname, 'views/js')))
    app.set('views', path.join(__dirname, 'views'))
    app.engine('ejs', engine)
    app.set('view engine', 'ejs')

    //Middlewares
    app.use(express.urlencoded({ extended: true }))
    app.use(session({
        secret: 'coderhouse',
        resave: false,
        saveUninitialized: false
    }))

    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        app.locals.signupMessage = req.flash('signupMessage')
        app.locals.signinMessage = req.flash('signinMessage')
        app.locals.user = req.user
        next()
    })

    //Rutas
    app.use('/', routes)

    // Escuchando puerto con minimist
    server.listen(PORT, () => {
        console.log(`Servidor escuchando puerto', ${PORT}`)
    })
}


//******************/

// SOCKET IO

//******************/
// Aún no pude hacerlo funcionar con plantillas

//Utilizamos Socket
io.on('connection', (socket) => {
    console.log('New Connection!!!', socket.id);

    /*const prod = { nombre: "Aksksks", precio: 123, url: "http://google.com" }
    let messages = { email: "a@email.com", message: "Hola", date: new Date().getTime() }

    io.emit('server:products', prod)
    io.emit('server:message', messages)

     socket.on('server:products', async productsInfo => {

        products.insertProduct(productsInfo)

        const prod = products.getAll()
        io.emit('server:products', prod)

    })

    socket.on('client:message', async messageInfo => {
        const date = new Date(Date.now()).toLocaleString().replace(',', '');
        messageInfo.date = date

        mensajes.insertMessage(messageInfo)
        let messages = await mensajes.getMessages()

        io.emit('server:message', messages)
    }) */
})