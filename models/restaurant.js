const {Schema,model} = require('mongoose')


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
    }
})

const restaurantSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean
    },
    rating: {
        type: Number,
    },
    menu: [menuSchema]
})

const Restaurant = model('Restaurant', restaurantSchema)

module.exports = Restaurant