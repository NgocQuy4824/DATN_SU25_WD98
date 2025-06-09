const TypeProductService = require('../services/TypeProductService');

const createTypeProduct = async (req, res) => {
    try {
        const { name = '' } = req.body;
        if (!name.trim()) {
            return res.status(400).json({ message: 'Tên loại là bắt buộc' });
        }
        const response = await TypeProductService.createTypeProduct(name);

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    createTypeProduct
};
