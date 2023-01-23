const Router = require('express')
const { category } = require('../controllers')


const router = new Router()

router.get('/:id',category.get)
router.post('/',category.create)
router.get('/', category.getAll)
router.put('/:id', category.update)
router.delete('/:id', category.delete)

module.exports = router