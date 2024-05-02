const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    _id: String,
    name: String,
    bar_code: Number,
    category: String,
    entry_price: Number,
    price: Number,
    quantity: Number,
    size: String,


    created: {
        type: Date,
        default: Date.now()
    }
})


// Create a model from the schema
const Order = mongoose.model('Order', orderSchema)

module.exports = orderSchema

