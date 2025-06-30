

const validateAddToCart = (req, res, next) => {
    const { productId, variantId, quantity } = req.body;

    if (!productId || !variantId || quantity === undefined) {
        return res.status(400).json({ status: 'ERROR', message: 'Thiếu dữ liệu: productId, variantId, quantity' });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ status: 'ERROR', message: 'Số lượng phải là số nguyên dương' });
    }

    next();
};


module.exports = {
    validateAddToCart
}