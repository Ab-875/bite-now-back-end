const {Schema,model, default: mongoose} = require('mongoose')




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
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    }
})

const Restaurant = model('Restaurant', restaurantSchema)

module.exports = Restaurant