const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('ItemSchema', itemSchema)