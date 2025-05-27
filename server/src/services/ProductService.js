const Product = require('../models/ProductsModel');

const createProduct = async (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name = '', image = '', type = '', price = 0, countInStock = 0, rating = 0, description = '' } = newProduct;
        try {
            const checkProduct = await Product.findOne({ name: name });// kiểm tra tên sản phẩm đã tồn tại chưa 
            if (checkProduct) {
                return resolve({
                    status: "OK",
                    message: 'Tên sản phẩm đã tồn tại'
                });
            }
            const newProduct = await Product.create({
                name: name,
                image: image,
                type: type,
                price: price,
                countInStock: countInStock,
                rating: rating,
                description: description
            })
            if (newProduct) {
                resolve({
                    status: "OK",
                    message: 'Tạo sản phẩm thành công',
                    data: newProduct
                });
            }
        } catch (error) {
            console.log(error);
        }
    })
}

//cập nhật sản phẩm
const updateProduct = async (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return resolve({
                    status: "ERROR",
                    message: 'Sản phẩm không tồn tại'
                });
            }
            const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true });
            if (updatedProduct) {
                resolve({
                    status: "OK",
                    message: 'Cập nhật sản phẩm thành công',
                    data: updatedProduct
                });
            } else {
                resolve({
                    status: "ERROR",
                    message: 'Cập nhật sản phẩm thất bại'
                });
            }
        } catch (error) {
            console.log(error);
        }
    })

}



module.exports = {
    createProduct,
    updateProduct
};