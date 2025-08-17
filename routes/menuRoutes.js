const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menu')

router.get('/', menuController.allOrders)
router.post('/', menuController.createOrder)
router.get('/:id', menuController.showOrder)
router.put('/:id', menuController.updateOrder)
router.delete('/:id', menuController.deleteOrder)

module.exports = router