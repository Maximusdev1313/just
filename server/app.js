require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000
process.env.TZ = "Asia/Tashkent"

app.use(cors({ origin: ['http://localhost:5173'] }))
// https://script.google.com/macros/s/AKfycbwJHcuy9q9JL6cT3w8BE280nfLcgtVqeIOPxajqFzMcwjf8D-F0nlDwhxqrK3BNnCFc/exec
// AKfycbwJHcuy9q9JL6cT3w8BE280nfLcgtVqeIOPxajqFzMcwjf8D-F0nlDwhxqrK3BNnCFc
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
app.use('/api/products', require('./routes/productRoutes'))
// app.use('/api/days', require('./routes/reportRoutes'))
// app.use('/api/orders', require('./routes/orderRoutes'))
// app.use('/user', require('./routes/userRoutes'))
//port listening
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})