const express = require('express')
const dotenv = require('dotenv').config()
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const orderRoutes = require('./routes/orderRoutes')
const orderRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/restaurantRoutes')


const app = express()

mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', () => {
    console.log("connected to database")
})

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use('/order', orderRoutes)
app.use('/menu', menuRoutes)
app.use('/restaurant', restaurantRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log('listening on port')
})