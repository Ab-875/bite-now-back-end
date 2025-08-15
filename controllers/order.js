const Order = require('../models/order')

async function createOrder(req,res){
    try{
        const createdOrder = await Order.create(req.body)
        res.status(201).json(createdOrder)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

async function allOrders(req,res){
    try{
        const allOrders = await Order.find()
        res.status(200).json(allOrders)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}
async function showOrder(req,res){
    try{
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}
async function updateOrder(req,res){
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updatedOrder)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}
async function deleteOrder(req,res){
    try{
        const deletedTrack = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedTrack)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createOrder,
    allOrders,
    showOrder,
    updateOrder,
    deleteOrder
}