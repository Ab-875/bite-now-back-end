const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menu')

router.get('/', menuController.allMenus)
router.post('/', menuController.createdMenu)
router.get('/:id', menuController.showMenu)
router.put('/:id', menuController.updateMenu)
router.delete('/:id', menuController.deleteMenu)

module.exports = router