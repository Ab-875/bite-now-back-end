const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    foodItem: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const Order = model('Order', orderSchema)

module.exports = Order