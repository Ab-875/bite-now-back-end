const express = require('express')
const dotenv = require('dotenv').config()
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const orderRoutes = require('./routes/orderRoutes')
const menuRoutes = require('./routes/menuRoutes')
const authRoutes = require('./routes/authRoutes')


const app = express()

mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', () => {
    console.log("connected to database")
})

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use('/auth', authRoutes)
app.use('/order', orderRoutes)
app.use('/menu', menuRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log('listening on port')
})