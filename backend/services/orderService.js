const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (params) => {
  const { userId, cart } = params;

  if (!cart) throw { message: "cart was not provided", statusCode: 400 };
  if (!userId) throw { message: "userId was not provided", statusCode: 400 };

  // Create order document
  const orderProducts = [];
  for (const prod of cart.products) {
    const dbProd = await Product.findById(prod.id).lean();
    if (!dbProd) throw { message: `Product with id ${prod.id} not found`, statusCode: 400 };

    let productQuantity = dbProd.quantity;
    let updatedQuantity = productQuantity - prod.quantity;
    productQuantity = updatedQuantity > 0 ? updatedQuantity : 0;

    // update product quantity
    await Product.findByIdAndUpdate(prod.id, { quantity: productQuantity });

    orderProducts.push({ product_id: prod.id, quantity: prod.quantity });
  }

  const newOrder = new Order({ user_id: userId, products: orderProducts });
  const saved = await newOrder.save();
  return { message: `Order was successfully placed with order id ${saved._id}`, orderId: saved._id, products: cart.products, statusCode: 201 };
};

exports.getSingleOrder = async (params) => {
  const { orderId, userId } = params;

  if (!orderId) throw { message: "orderId was not provided", statusCode: 400 };
  if (!userId) throw { message: "userId was not provided", statusCode: 400 };

  const order = await Order.findOne({ _id: orderId, user_id: userId }).lean().populate('products.product_id');
  if (!order) throw { message: "order was not found", statusCode: 400 };
  return { statusCode: 200, message: `Order was found`, data: order };
};

exports.getOrders = async (params) => {
  const { userId } = params;

  if (!userId) throw { message: "userId was not provided", statusCode: 400 };

  const orders = await Order.find({ user_id: userId }).lean().populate('products.product_id');
  if (!orders || orders.length === 0) throw { message: "No order were found", statusCode: 400 };
  return { statusCode: 200, message: `${orders.length} orders were found`, data: orders };
};
