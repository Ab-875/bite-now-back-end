const Restaurant = require('../models/restaurant')

async function createRestaurant(req, res) {
    try {
        const createdOrder = await Restaurant.create(req.body)
        res.status(201).json(createdOrder)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function allRestaurants(req, res) {
    try {
        const allOrders = await Restaurant.find()
        res.status(200).json(allOrders)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function showRestaurant(req, res) {
    try {
        const order = await Restaurant.findById(req.params.id)
        res.status(200).json(order)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateRestaurant(req, res) {
    try {
        const updatedOrder = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedOrder)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function deleteRestaurant(req, res) {
    try {
        const deletedTrack = await Restaurant.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedTrack)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createRestaurant,
    allRestaurants,
    showRestaurant,
    updateRestaurant,
    deleteRestaurant
}