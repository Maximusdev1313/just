const mongoose = require('mongoose')
const soldProductSchema = mongoose.Schema({
    name: {
        type: String,
        default: '',

    },
    category: String,
    entry_price: Number,
    bar_code: Number,
    price: Number,
    quantity_in_store: Number,
    salesman: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'ta'
    },
    discount_price: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    minimal_quantity: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: ''
    },
    fillial: {
        type: String,
        default: 'Avval1'
    },
    image: {
        type: String,
        default: ''
    },
    image_link: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('soldProduct', soldProductSchema)