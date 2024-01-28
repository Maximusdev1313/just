const mongoose = require('mongoose');
const WorkerSchema = require('./workers')
const bcrypt = require('bcrypt');

const OwnerSchema = new mongoose.Schema({
    owner_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    market_name: {
        type: String,
        required: true
    },

    money: {
        type: Number,
        default: 0
    },
    is_active: {
        type: Boolean,
        default: false
    },
    last_activation: {
        type: Date
    },
    promo: {
        type: String,
        default: ''
    },

    workers: [WorkerSchema],
});

OwnerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Owner', OwnerSchema);
