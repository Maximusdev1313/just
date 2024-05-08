require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const smsController = require('../controllers/smsController');
const app = express()
const serverless = require("serverless-http");

const router = express.Router();

const port = process.env.PORT || 5000
process.env.TZ = "Asia/Tashkent"

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'https://main--hilarious-meerkat-75b459.netlify.app', 'https://justuz.netlify.app', 'https://razzoq.uz'] }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))

// database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected")
}).catch(err => console.log(err))

//routes
router.use('/api/products', require('../routes/productRoutes'))
router.use('/api/sold-products', require('../routes/soldProductRoutes'))
router.use('/api/return-products', require('../routes/returnProductRoutes'))
router.use('/api/entry-products', require('../routes/entryProductRoutes'))
router.use('/api/outlays', require('../routes/outlayRoutes'))
router.use('/api', require('../routes/users/userRoutes'))
router.use('/api/orders', require('../routes/orderRoutes'))
router.post('/send-sms', smsController.sendSMS);

app.use(`/.netlify/functions/app`, router);

module.exports.handler = serverless(app);
