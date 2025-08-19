const Order = require('../models/order')
const Menu = require('../models/menu')

async function createOrder(req, res) {
    try {
        if (!req.user || req.user.role !== "customer") {
            return (res.status(403).json({ error: "Only for Customers" }))
        }

        const items = Array.isArray(req.body.items) ? req.body.items : []
        if (!items.length) {
            return (res.status(400).json({ error: "Items array is required" }))
        }

        const normalized = []
        let total = 0

        for (const item of items) {
            if (!item.menuItem) {
                return (res.status(400).json({ error: "menuItem is required" }))
            }
            const menu = await Menu.findById(item.menuItem)
            if (!menu) {
                return res.status(400).json({ error: "Menu item not found" })
            }
            const quantity = Math.max(1, Number(item.quantity || 1))
            total += menu.price * quantity
            normalized.push({ menuItem: menu._id, quantity, notes: item.notes || "" })
        }

        const created = await Order.create({
            customer: req.user.id,
            items: normalized,
            price: total,
            status: "pending"
        })

        const populated = await Order.findById(created._id)
            .populate("items.menuItem")
            .populate("customer", "username")

        res.status(201).json(populated)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function allOrders(req, res) {
    try {
        let filter = {}
        if (req.user.role === "customer") {
            filter.customer = req.user.id
        }
        const allOrders = await Order.find(filter)
            .populate("items.menuItem")
            .populate("customer", "username")
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function showOrder(req, res) {
    try {
        const order = await Order.findById(req.params.id)
            .populate("items.menuItem")
            .populate("customer", "username _id")
        if (!order) {
            return res.status(404).json({ error: "Not Found" })
        }
        const customerId = order.customer?._id ? String(order.customer._id) : String(order.customer)
        if (req.user.role === "customer" && customerId !== String(req.user.id)) {
            return res.status(403).json({ error: "Unauthorized" })
        }
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


async function updateOrder(req, res) {
    try {
        const existing = await Order.findById(req.params.id)
        if (!existing) {
            return (res.status(404).json({ error: "Not Found" }))
        }
        if (req.user.role === "customer" && String(existing.customer) !== String(req.user.id)) {
            return res.status(403).json({ error: "Unauthorized" })
        }

        let update = {}
        if (Array.isArray(req.body.items)) {
            const normalized = []
            let total = 0
            for (const item of req.body.items) {
                if (!item.menuItem) return res.status(400).json({ error: "menuItem is required" })
                const menu = await Menu.findById(item.menuItem)
                if (!menu) return res.status(400).json({ error: "Menu item not found" })
                const quantity = Math.max(1, Number(item.quantity || 1))
                total += menu.price * quantity
                normalized.push({ menuItem: menu._id, quantity, notes: item.notes || "" })
            }
            update.items = normalized
            update.price = total
        }
        if (req.body.status) update.status = req.body.status

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, update, { new: true })
            .populate("items.menuItem")
            .populate("customer", "username")
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function deleteOrder(req, res) {
    try {
        const existing = await Order.findById(req.params.id)
        if (!existing) return res.status(404).json({ error: "Not Found" })
        if (req.user.role === "customer" && String(existing.customer) !== String(req.user.id)) {
            return res.status(403).json({ error: "Unauthorized" })
        }
        const deletedOrder = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedOrder)
    } catch (error) {
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