const ProductService = require('../services/ProductService');

//thêm sản phẩm
const createProduct = async (req, res) => {
    try {
        const { name = '', image = '', type = '', price = 0, countInStock = 0, sold = 0,variants = [] , description = '' } = req.body;
        if (!name || !image || !type || !price || !countInStock || !sold || !variants) {
            return res.status(400).json({ message: 'Bắt buộc phải nhập' });
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}

// cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;// lấy id từ params
        const data = req.body;  // lấy dữ liệu từ body
        if (!productId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID sản phẩm không hợp lệ'
            });
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}

// lấy chi tiết sản phẩm
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID sản phẩm không hợp lệ'
            });
        }
        const response = await ProductService.getDetailsProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct
};