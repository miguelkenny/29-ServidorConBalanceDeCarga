const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')

function isAuthenticated(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/')
}

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    passReqToCallback: true
}))

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback: true
}))

router.get('/logout', (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/");
    });
})

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile')
})


// Requerimos Fork
const { fork } = require('child_process')

//Ruta para desafio N° 28
router.get('/info', (req, res) => {
    res.json({
        path: process.cwd(),
        id_process: process.pid,
        node_v: process.version,
        so: process.platform,
        memory_used: process.memoryUsage(),
    })
})

//Ruta para desafio N° 28
router.get('/api/randoms', (req, res) => {
    const { cant } = req.query

    console.log(cant)

    const forked = fork(path.join(__dirname + '/child.js'))

    if (!cant) {
        forked.send(10000)
    } else {
        forked.send(cant)
    }

    forked.on('message', (msg) => {
        res.json({
            random_numbers: msg,
        })
    })
})


// Ruta para Desafio 29
// Para no duplicar los servidores, apunto al mismo endpoint probandolos en distintos momentos. No se detectaron errores

router.get('/api/randoms/datos', (req, res) => {
    res.send(`Server Desafio 29 - En puerto ${process.argv[2]}`)
})

module.exports = router