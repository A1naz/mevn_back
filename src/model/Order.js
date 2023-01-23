const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose')

const schema = new Schema({
  billId: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  fullname: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
  clientSecret: {
    type: String,
    default: '',
  },
  products: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
  status: {
    type: String,
    default: 'WAITING',
  },
})

module.exports = model('Order', schema)
