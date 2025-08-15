const express = requrie('express')
const router = express.Router()
const orderController = require('../controllers/order')

router.get('/', orderController.allOrders)
router.post('/', orderController.createOrder)
router.get('/:id', orderController.showOrder)
router.put('/:id', orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

module.exports = router