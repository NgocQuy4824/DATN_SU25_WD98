const Product = require('../models/ProductsModel');

//thêm sản phẩm
const createProduct = async (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name = '', image = '', type = '', price = 0, countInStock = 0, sold = 0, variants = [], description = '' } = newProduct;
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
                sold: sold,
                variants: variants,
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

// lấy chi tiết sản phẩm
const getDetailsProduct = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return resolve({
                    status: "ERROR",
                    message: 'Sản phẩm không tồn tại'
                });
            } else {
                resolve({
                    status: "OK",
                    message: 'Lấy chi tiết sản phẩm thành công',
                    data: product
                });
            }
        } catch (error) {
            console.log(error);
        }
    })
}
//xoa san pham

const deleteProduct = (id)=> {
   return new Promise(async (resolve, reject) => {
    try {
        const checkProduct = await Product.findOne({
            _id: id
        })
        if (checkProduct === null) {
            resolve({
                satatus: 'OK',
                message: 'XOA'
            })
        }
        await Product.findByIdAndDelete(id)
        resolve({
            status: 'OK',
            message: 'XOA'
        })
    } catch (e) {
        reject(e)
    }
   })
}
//gett all san pham

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find()
            resolve({
                status: 'OK',
                message: 'OKK',
                data: allProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
};