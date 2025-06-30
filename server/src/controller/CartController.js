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



module.exports = {
    addToCart,
    getMyCart
}