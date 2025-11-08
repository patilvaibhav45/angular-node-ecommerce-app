const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [OrderDetailSchema],
  total: Number,
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
