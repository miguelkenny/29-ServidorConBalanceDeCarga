const mongoose = require('mongoose')
const { mongodb } = require('./keys')

mongoose.connect(mongodb.URI, {useNewUrlParser: true})
    .then(db => console.log('DB Conectada'))
    .catch(err => console.log(err.message))