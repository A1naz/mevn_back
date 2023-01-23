const Router = require('express')
const { payment } = require('../controllers')


const router = new Router()

router.get('/:id', payment.checkPayment)
router.post('/',payment.createPaymentIntent)

module.exports = router