const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  images: [String],
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  short_desc: String,
  cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
