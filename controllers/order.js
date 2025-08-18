const Order = require('../models/order')

async function createOrder(req, res) {
    try {
        if (req.user.role !== "customer") {
            return (res.status(403).json({ error: "Only for Customers"}))
        }
        const createdOrder = await Order.create({
            ...req.body,
            customer: req.user._id,
            status: "pending"
        })
        res.status(201).json(createdOrder)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function allOrders(req, res) {
    try {
        let filterCustomer = {}

        if (req.user.role === "customer") {
            filterCustomer.customer = req.user._id
        }
        const allOrders = await Order.find(filterCustomer).populate("items.menuItem").populate("customer", "username")
        res.status(200).json(allOrders)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function showOrder(req, res) {
    try {
        const order = await Order.findById(req.params.id).populate("items.menuItem").populate("customer", "username")
        if (!order) {
            return (res.status(404).json({ error: "Not Found"}))
        }
        if (req.user.role === "customer" && !order.customer.equals(req.user._id)) {
            return (res.status(403).json({ error: "Unauthorized"}))
        }
        res.status(200).json(order)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateOrder(req, res) {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedOrder)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function deleteOrder(req, res) {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedOrder)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createOrder,
    allOrders,
    showOrder,
    updateOrder,
    deleteOrder
}