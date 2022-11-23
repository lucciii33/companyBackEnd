const port = process.env.PORT || 5000
const colors = require('colors')
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors")
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()

app.use
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/order', require('./routes/orderRoute'))
app.use('/contact', require('./routes/contactRoute'))
app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port ${port}`))