const Product = require('../models/ProductsModel');

//thêm sản phẩm
const createProduct = async (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name = '', category = '', price = 0, discount = 0, variants = [], description = '', isActive } = newProduct;
        try {
            const checkProduct = await Product.findOne({ name: name, category: category });// kiểm tra tên ,loại sản phẩm đã tồn tại chưa 
            if (checkProduct) {
                return resolve({
                    status: "ERROR",
                    message: 'Tên sản phẩm đã tồn tại trong cùng loại'
                });
            }
            const newProduct = await Product.create({
                name: name,
                category: category,
                price: price,
                discount: discount,
                variants: variants,
                description: description,
                isActive: typeof isActive === 'string' ? isActive === 'true' : Boolean(isActive)

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

const deleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);

        if (!product) {
            return {
                status: 'ERROR',
                message: 'Sản phẩm không tồn tại',
            };
        }

        await Product.findByIdAndDelete(id);

        return {
            status: 'OK',
            message: 'Xóa sản phẩm thành công',
        };
    } catch (error) {
        console.error(error);
    }
}
//get all sản phẩm

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find().populate('category')
            if (allProduct.length > 0) {
                resolve({
                    status: "OK",
                    message: 'Lấy danh sách sản phẩm thành công',
                    data: allProduct
                });
            } else {
                resolve({
                    status: "ERROR",
                    message: 'Không có sản phẩm nào',
                    data: []
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

//ẩn sản phẩm
const hideProduct = async (id) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: id, isActive: true },
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return {
                status: 'ERROR',
                message: 'Không tìm thấy sản phẩm hoặc sản phẩm đã bị ẩn',
            };
        }

        return {
            status: 'OK',
            message: 'Ẩn sản phẩm thành công',
            data: product
        };
    } catch (error) {
        console.error(error);
    }
}

//hiển thị sản phẩm 
const showProduct = async (id) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: id, isActive: false },
            { isActive: true },
            { new: true }
        );

        if (!product) {
            return {
                status: 'ERROR',
                message: 'Không tìm thấy sản phẩm hoặc sản phẩm đang hiển thị',
            };
        }

        return {
            status: 'OK',
            message: 'Hiển thị lại sản phẩm thành công',
            data: product
        };
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    hideProduct,
    showProduct
};