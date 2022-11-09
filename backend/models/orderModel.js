const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    items: {
        type: Array,
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
module.exports = mongoose.model('OrderSchema', orderSchema)