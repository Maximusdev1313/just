const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const WorkerSchema = mongoose.Schema({
    name: String,
    phone_number: String,
    password: String,
    money: Number,
    market_name: {
        type: String,
        default: ''
    },

    created: {
        type: Date,
        default: Date.now()
    }
})

WorkerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
// Create a model from the schema
const Worker = mongoose.model('Worker', WorkerSchema)

module.exports = WorkerSchema

