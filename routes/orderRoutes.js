const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')
const secureRoute = require('../middleware/secureRoute')

router.get('/', secureRoute, orderController.allOrders)
router.post('/',  secureRoute, orderController.createOrder)
router.get('/:id', secureRoute, orderController.showOrder)
router.put('/:id', secureRoute, orderController.updateOrder)
router.delete('/:id', secureRoute, orderController.deleteOrder)

module.exports = router