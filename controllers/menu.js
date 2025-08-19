const Menu = require('../models/menu')

async function createdMenu(req, res) {
    try {
        if (req.user.role !== "owner") {
            return (res.status(403).json({ error: "Unauthorized Access" }))
        }
        const createdItem = await Menu.create({
            ...req.body,
            owner: req.user.id
        })
        res.status(201).json(createdItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function allMenus(req, res) {
    try {
        const allItems = await Menu.find().populate("owner", "username")
        res.status(200).json(allItems)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function showMenu(req, res) {
    try {
        const item = await Menu.findById(req.params.id)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateMenu(req, res) {
    try {
        if (req.user.role !== "owner") {
            return (res.status(403).json({ error: "Unauthorized Access" }))
        }
        const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function deleteMenu(req, res) {
    try {
        if (req.user.role !== "owner") {
            return (res.status(403).json({ error: "Unauthorized Access" }))
        }
        const deletedItem = await Menu.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createdMenu,
    allMenus,
    showMenu,
    updateMenu,
    deleteMenu
}
