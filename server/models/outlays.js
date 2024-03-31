const mongoose = require('mongoose')
const outlaySchema = mongoose.Schema({
    price: Number,
    salesman: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        default: ''
    },
    market_name: {
        type: String,
        default: 'Avval1'
    },

    created: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Outlay', outlaySchema)