const cartService = require('../services/CartService')

const addToCart = async (req, res) => {
    try {
        const { productId, variantId, quantity } = req.body;
        const response = await cartService.addToCart(req.userId, productId, variantId, quantity);
        return res.status(response.status === 'ERROR' ? 400 : 200).json(response);
    } catch (error) {
        console.error('Lỗi addToCart:', error);
        return res.status(500).json({ status: 'ERROR', message: 'Lỗi server khi thêm sản phẩm vào giỏ' });
    }
};

const getMyCart = async (req, res) => {
  try {
    const response = await cartService.getMyCart(req.userId);
    return res.status(response.status === 'ERROR' ? 400 : 200).json(response);
  } catch (error) {
    console.error('Lỗi getMyCart:', error);
    return res.status(500).json({ status: 'ERROR', message: 'Lỗi server khi lấy giỏ hàng' });
  }
};

const removeAllCartItems = async (req, res) => {
  try {
    const response = await cartService.removeAllCartItems(req.userId);
    return res.status(response.status === 'ERROR' ? 400 : 200).json(response);
  } catch (error) {
    console.error('Lỗi removeAllCartItems:', error);
    return res.status(500).json({ status: 'ERROR', message: 'Lỗi server khi xoá giỏ hàng' });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { variantId } = req.params;
    const response = await cartService.removeCartItem(req.userId, variantId);
    return res.status(response.status === 'ERROR' ? 400 : 200).json(response);
  } catch (error) {
    console.error('Lỗi removeCartItem:', error);
    return res.status(500).json({ status: 'ERROR', message: 'Lỗi server khi xoá sản phẩm khỏi giỏ' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, variantId, quantity } = req.body;
    const response = await cartService.updateCartItemQuantity(
      req.userId, productId, variantId, quantity
    );
    return res.status(response.status === 'ERROR' ? 400 : 200).json(response);
  } catch (error) {
    console.error('Lỗi updateCartItemQuantity:', error);
    return res.status(500).json({ status: 'ERROR', message: 'Lỗi server khi cập nhật số lượng' });
  }
};

module.exports = {
    addToCart,
    getMyCart,
    removeAllCartItems,
    removeCartItem,
    updateCartItemQuantity
}