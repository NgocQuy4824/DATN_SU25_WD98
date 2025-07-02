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
    let warning = null;

    // Check product
    if (!product || product.isActive === false) {
      warning = 'Sản phẩm này không còn khả dụng hoặc đã bị ẩn !';
    }

    // Check variant
    const variant = product?.variants?.find(v => v._id.toString() === item.variant.toString());
    if (!variant) {
      warning = 'Biến thể của sản phẩm không còn tồn tại.';
    }

    return {
      productId: product?._id,
      variantId: item.variant,
      quantity: item.quantity,
      name: product?.name,
      price: product?.price,
      discount: product?.discount,
      description: product?.description,
      category: product?.category ? product.category.name : null,
      variant: variant ? {
        _id: variant._id,
        color: variant.color,
        size: variant.size,
        image: variant.image,
        countInStock: variant.countInStock,
      } : null,
      warning, 
    };
  });

  return { status: 'OK', message: 'Lấy giỏ hàng thành công', data: { userId: cart.userId, items } };
};


//xóa all
const removeAllCartItems = async (userId) => {
  userId = new mongoose.Types.ObjectId(userId);

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return { status: 'ERROR', message: 'Không tìm thấy giỏ hàng' };
  }

  cart.items = []; 
  await cart.save();

  return { status: 'OK', message: 'Đã xoá toàn bộ giỏ hàng', data: { userId, items: [] } };
};

//xóa từng sp
const removeCartItem = async (userId, variantId) => {
  userId = new mongoose.Types.ObjectId(userId);
  variantId = new mongoose.Types.ObjectId(variantId);

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return { status: 'ERROR', message: 'Không tìm thấy giỏ hàng' };
  }

  //nếu có sp trong giỏ hàng thì xóa k thì lỗi
  const originalLength = cart.items.length;
  cart.items = cart.items.filter(item => !item.variant.equals(variantId));

  if (cart.items.length === originalLength) {
    return { status: 'ERROR', message: 'Không tìm thấy sản phẩm trong giỏ hàng' };
  }

  await cart.save();

  return { status: 'OK', message: 'Đã xoá sản phẩm khỏi giỏ hàng', data: cart };
};

//update số lượng
const updateCartItemQuantity = async (userId, productId, variantId, quantity) => {
  userId = new mongoose.Types.ObjectId(userId);
  productId = new mongoose.Types.ObjectId(productId);
  variantId = new mongoose.Types.ObjectId(variantId);
  quantity = parseInt(quantity, 10);

  const product = await Product.findById(productId).lean();
  if (!product) {
    return { status: 'ERROR', message: 'Không tìm thấy sản phẩm' };
  }

  const variant = product.variants.find(v => v._id.equals(variantId));
  if (!variant) {
    return { status: 'ERROR', message: 'Không tìm thấy biến thể' };
  }

  if (quantity < 1) quantity = 1;
  if (quantity > variant.countInStock) quantity = variant.countInStock;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return { status: 'ERROR', message: 'Không tìm thấy giỏ hàng' };
  }

  const item = cart.items.find(item => item.variant.equals(variantId));
  if (!item) {
    return { status: 'ERROR', message: 'Không tìm thấy sản phẩm trong giỏ hàng' };
  }

  item.quantity = quantity;
  await cart.save();

  return { status: 'OK', message: 'Cập nhật số lượng thành công', data: cart };
};


module.exports = {
  addToCart,
  getMyCart,
  removeAllCartItems,
  removeCartItem,
  updateCartItemQuantity
}