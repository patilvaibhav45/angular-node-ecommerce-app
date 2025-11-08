const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; // 0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 10;
  }

  const results = await Product.find()
    .skip(startValue)
    .limit(parseInt(limit))
    .populate('cat_id', 'title')
    .lean();
  res.json(results.map(r => ({ ...r, category: r.cat_id?.title })));
});

// GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const result = await Product.findById(productId).populate('cat_id', 'title').lean();
  if (!result) return res.status(404).json({ message: 'Product not found' });
  res.json({ ...result, category: result.cat_id?.title });
});

module.exports = router;
