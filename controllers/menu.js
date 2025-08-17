const Item = require('../models/menu')

async function createdItem(req, res) {
    try {
        const createdItem = await Item.create(req.body)
        res.status(201).json(createdItem)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function allItems(req, res) {
    try {
        const allItems = await Item.find()
        res.status(200).json(allItems)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function showItem(req, res) {
    try {
        const item = await Item.findById(req.params.id)
        res.status(200).json(item)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateItem(req, res) {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedItem)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function deleteItem(req, res) {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedItem)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createdItem,
    allItems,
    showItem,
    updateItem,
    deleteItem
}