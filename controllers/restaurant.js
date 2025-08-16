const Restaurant = require('../models/restaurant')

async function createRestaurant(req, res) {
    try {
        const createdRestaurant = await Restaurant.create(req.body)
        res.status(201).json(createdRestaurant)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function allRestaurants(req, res) {
    try {
        const allRestaurants = await Restaurant.find()
        res.status(200).json(allRestaurants)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function showRestaurant(req, res) {
    try {
        const oneRestaurant = await Restaurant.findById(req.params.id)
        res.status(200).json(oneRestaurant)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateRestaurant(req, res) {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedRestaurant)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function deleteRestaurant(req, res) {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedRestaurant)
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