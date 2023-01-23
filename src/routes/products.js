const Router = require('express')
const { product } = require('../controllers')

const router = new Router()

router.get('/:id',product.get)
router.post('/',product.create)
router.get('/', product.getAll)
router.put('/:id', product.update)
router.delete('/:id', product.delete)

module.exports = router