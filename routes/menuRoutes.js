const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menu')
const secureRoute = require('../middleware/secureRoute')

router.get('/', menuController.allMenus)
router.post('/', menuController.createdMenu)
router.get('/:id', secureRoute, menuController.showMenu)
router.put('/:id', secureRoute, menuController.updateMenu)
router.delete('/:id', secureRoute, menuController.deleteMenu)

module.exports = router