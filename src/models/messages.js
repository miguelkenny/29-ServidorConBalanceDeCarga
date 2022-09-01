const mongoose = require('mongoose')

const { Schema } = require('mongoose')

const messagesSchema = new Schema({
    email: { type: String, required: true},
    message: { type: String, required: true },
    date: { type: String, required: true }
})

module.exports = mongoose.model('messages', messagesSchema)