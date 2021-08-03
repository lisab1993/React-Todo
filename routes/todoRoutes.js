const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/', todoController.getAll)
router.post('/', todoController.create)
router.get('/:todoId', todoController.getById)
router.put('/:todoId', todoController.updateById)
router.delete('/:todoId', todoController.deleteById)

module.exports = router