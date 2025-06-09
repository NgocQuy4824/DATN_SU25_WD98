const ProductType = require('../models/TypeProductModel');


const createTypeProduct = async (name) => {
    try {
        const checkType = await ProductType.findOne({ name });
        if (checkType) {
            return { status: 'ERROR', message: 'Loại sản phẩm đã tồn tại' };
        }

        const newType = await ProductType.create({ name });
        return { status: 'OK', message: 'Tạo thành công', data: newType };
    } catch (error) {
        console.error(error);
    }
};



module.exports = {
    createTypeProduct
};