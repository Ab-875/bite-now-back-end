const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant')

router.get('/', restaurantController.allOrders)
router.post('/', restaurantController.createOrder)
router.get('/:id', restaurantController.showOrder)
router.put('/:id', restaurantController.updateOrder)
router.delete('/:id', restaurantController.deleteOrder)

module.exports = router