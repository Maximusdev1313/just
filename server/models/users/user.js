const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['owner', 'worker'],
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
    role: String,

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


});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
