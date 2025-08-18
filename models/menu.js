const { Schema, model } = require('mongoose')

const menuSchema = new Schema ({
    item: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength : 15
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})


const Menu = model('Menu', menuSchema)

module.exports = Menu