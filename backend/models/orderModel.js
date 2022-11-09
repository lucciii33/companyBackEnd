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

const orderSchema = mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    totalPrice:{
        type: Number,
        required: true
    },
//    user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: false,
//     ref: 'PractitionerProfile'
//    }
})
module.exports = mongoose.model('ItemSchema', itemSchema)