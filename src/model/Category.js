const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    default: "",
  },
  discription: {
    type: String,
    default: "",
  },
  products: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
})

module.exports = model('Category', schema)
