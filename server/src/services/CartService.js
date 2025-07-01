const mongoose = require('mongoose');
const Cart = require('../models/CartModel')
const Product = require('../models/ProductsModel')


const addToCart = async (userId, productId, variantId, quantity) => {
  userId = new mongoose.Types.ObjectId(userId);
  productId = new mongoose.Types.ObjectId(productId);
  variantId = new mongoose.Types.ObjectId(variantId);

  const product = await Product.findById(productId).lean();
  if (!product) return { status: 'ERROR', message: 'Không tìm thấy sản phẩm' };

  const variant = product.variants.find(v => v._id.equals(variantId));
  if (!variant) return { status: 'ERROR', message: 'Không tìm thấy biến thể' };

  let finalQuantity = Math.max(1, Math.min(parseInt(quantity, 10), variant.countInStock));

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ product: productId, variant: variantId, quantity: finalQuantity }],
    });
    await cart.save();
    return { status: 'OK', message: 'Đã tạo giỏ và thêm sản phẩm', data: cart };
  }

  const existItemIndex = cart.items.findIndex(item => item.variant.equals(variantId));
  if (existItemIndex !== -1) {
    cart.items[existItemIndex].quantity = Math.min(
      cart.items[existItemIndex].quantity + finalQuantity,
      variant.countInStock
    );
  } else {
    cart.items.push({ product: productId, variant: variantId, quantity: finalQuantity });
  }

  await cart.save();
  return { status: 'OK', message: 'Cập nhật giỏ hàng thành công', data: cart };
};



const getMyCart = async (userId) => {
  userId = new mongoose.Types.ObjectId(userId);

  const cart = await Cart.findOne({ userId })
    .populate({ path: 'items.product', populate: [{ path: 'category' }, { path: 'variants.size' }] })
    .lean();

  if (!cart) {
    return { status: 'OK', message: 'Giỏ hàng trống', data: { items: [] } };
  }

  const items = cart.items.map(item => {
    const product = item.product;

    // so sánh biến thể trong product có bằng vs biến thể không và gán vào biến variant
    const variant = product.variants.find(v => v._id.toString() === item.variant.toString());

    return {
      productId: product._id,
      variantId: item.variant,
      quantity: item.quantity,
      name: product.name,
      price: product.price,
      discount: product.discount,
      description: product.description,
      category: product.category ? product.category.name : null,
      variant: variant ? {
        _id: variant._id,
        color: variant.color,
        size: variant.size,
        image: variant.image,
        countInStock: variant.countInStock,
      } : null,
    };
  });

  return { status: 'OK', message: 'Lấy giỏ hàng thành công', data: { userId: cart.userId, items } };
};


module.exports = {
  addToCart,
  getMyCart
}