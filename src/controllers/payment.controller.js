const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk')
const { Order } = require('../model')

const SECRET_KEY =
  '='
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY)
const publicKey =
  ''

const createPaymentIntent = async (
  { body: { fullname, address, phone, email, products } },
  res
) => {
  try {
    if (!address) {
      throw new Error('Адрес обязателен')
    }

    const amount = products.reduce((acc, i) => acc + Number(i.price), 0)
    const billId = qiwiApi.generateId()
    const lifetime = qiwiApi.getLifetimeByDay(0.05)
    const fields = {
      amount: amount,
      currency: 'RUB',
      comment: 'Тестовый магазин игр',
      expirationDateTime: lifetime,
    }

    console.log(amount)
    const productsIds = products.map(({ _id }) => _id)
    const prepareOrder = {
      billId,
      fullname,
      address,
      phone,
      email,
      products: productsIds,
      amount,
    }

    const newOrder = await Order.create(prepareOrder)
    const saveOrder = await newOrder.save()

    const paymentIntent = await qiwiApi.createBill(billId, fields)
    return res.status(200).json({ paymentIntent, saveOrder })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

const checkPayment = async ({ params: { id }, res }) => {
  try {
    await qiwiApi.getBillInfo(`${id}`).then(async (data) => {
      console.log(data.status.value)
      if (data.status.value === 'PAID') {
        body = {
          billId: data.billId,
        }
        const order = await Order.findOneAndUpdate(body, {
          status: 'PAID',
        })
        console.log(order)
      }

      return res.status(200).json(data)
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  checkPayment,
  createPaymentIntent,
}
