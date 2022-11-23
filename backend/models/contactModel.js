const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    terms:{
        type: Boolean,
        required: true
    }

},{
    timestamps: true
})

module.exports = mongoose.model('ContactSchema', contactSchema)