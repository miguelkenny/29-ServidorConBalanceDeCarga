const mongoose = require('mongoose')

const { Schema } = require('mongoose')

const prodcutsSchema = new Schema({
    nombre: { type: String, required: true},
    precio: { type: Integer, required: true },
    url: { type: String, required: true }
})

module.exports = mongoose.model('products', prodcutsSchema)