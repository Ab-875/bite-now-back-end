const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            menuItem: {
                type: Schema.Types.ObjectId,
                ref: "Menu"
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },
            notes: {
                type: String
            },
        }
    ],
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'preparing', 'completed'],
        required: true
    },
    user: {
        type: Schema.model.ObjectId,
        ref: "User"
    }
})

const Order = model('Order', orderSchema)

module.exports = Order