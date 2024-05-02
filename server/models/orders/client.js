const mongoose = require('mongoose')
const OrderSchema = require('./order')
// const ReturnSchema = require('./return')

const ClientSchema = mongoose.Schema({
    clientId: { type: String, required: true, unique: true },
    name: String,
    phone_number: String,
    address: String,
    location: {
        type: String,
        default: ''
    },
    comment: {
        type: String,
        default: ''
    },
    total_order_price: String,
    filial: {
        type: String,
        default: 'Avval'
    },
    status: {
        type: String,
        default: 'waiting'
    },

    created: {
        type: Date,
        default: Date.now()
    },
    packer: {
        type: String,
        default: ''
    },
    deliver: {
        type: String,
        default: ''
    },
    deliver_number: {
        type: String,
        default: ''
    },
    orders: [OrderSchema],
    // returns: [ReturnSchema]
})
module.exports = mongoose.model('Client', ClientSchema)

