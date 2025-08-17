const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant')

router.get('/', restaurantController.allRestaurants)
router.post('/', restaurantController.createRestaurant)
router.get('/:id', restaurantController.showRestaurant)
router.put('/:id', restaurantController.updateRestaurant)
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router