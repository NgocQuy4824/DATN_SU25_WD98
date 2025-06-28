const Product = require("../models/ProductsModel");
const Size = require("../models/SizeModel");
const mongoose = require("mongoose");

//thêm sản phẩm
const createProduct = async (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name = "",
      category = "",
      price = 0,
      discount = 0,
      variants = [],
      description = "",
      isActive,
    } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
        category: category,
      }); // kiểm tra tên ,loại sản phẩm đã tồn tại chưa
      if (checkProduct) {
        return resolve({
          status: "ERROR",
          message: "Tên sản phẩm đã tồn tại trong cùng loại",
        });
      }

      const normalizedVariants = variants.map((variant) => ({
        ...variant,
        size: new mongoose.Types.ObjectId(variant.size),
      }));

      const newProduct = await Product.create({
        name: name,
        category: category,
        price: price,
        discount: discount,
        variants: normalizedVariants,
        description: description,
        isActive,
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "Tạo sản phẩm thành công",
          data: newProduct,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//cập nhật sản phẩm
const updateProduct = async (productId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return resolve({
          status: "ERROR",
          message: "Sản phẩm không tồn tại",
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
        new: true,
      });
      if (updatedProduct) {
        resolve({
          status: "OK",
          message: "Cập nhật sản phẩm thành công",
          data: updatedProduct,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Cập nhật sản phẩm thất bại",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

// lấy chi tiết sản phẩm
const getDetailsProduct = async (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(productId).populate("category");
      if (!product) {
        return resolve({
          status: "ERROR",
          message: "Sản phẩm không tồn tại",
        });
      } else {
        resolve({
          status: "OK",
          message: "Lấy chi tiết sản phẩm thành công",
          data: product,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
//xoa san pham

const deleteProduct = async (id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return {
        status: "ERROR",
        message: "Sản phẩm không tồn tại",
      };
    }

    await Product.findByIdAndDelete(id);

    return {
      status: "OK",
      message: "Xóa sản phẩm thành công",
    };
  } catch (error) {
    console.error(error);
  }
};
//get all sản phẩm

const getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allProduct = await Product.find().populate("category");
      if (allProduct.length > 0) {
        resolve({
          status: "OK",
          message: "Lấy danh sách sản phẩm thành công",
          data: allProduct,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Không có sản phẩm nào",
          data: [],
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
};

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
        status: "ERROR",
        message: "Không tìm thấy sản phẩm hoặc sản phẩm đã bị ẩn",
      };
    }

    return {
      status: "OK",
      message: "Ẩn sản phẩm thành công",
      data: product,
    };
  } catch (error) {
    console.error(error);
  }
};

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
        status: "ERROR",
        message: "Không tìm thấy sản phẩm hoặc sản phẩm đang hiển thị",
      };
    }

    return {
      status: "OK",
      message: "Hiển thị lại sản phẩm thành công",
      data: product,
    };
  } catch (error) {
    console.error(error);
  }
};

//  Lấy sản phẩm nổi bật (6 sản phẩm mới nhất và đang hiển thị)
const getHighlightProducts = async () => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ createdAt: -1 }) // mới nhất trước
      .limit(6)
      .populate("category"); // nếu cần dữ liệu danh mục

    return {
      status: "OK",
      message: "Lấy sản phẩm nổi bật thành công",
      data: products,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi lấy sản phẩm nổi bật",
    };
  }
};

//hiển thị sp chi tiết theo kích thước
// services/ProductService.js

const getProductsBySize = async (sizeId, excludeProductId) => {
  try {
    // Kiểm tra sizeId có tồn tại không
    const size = await Size.findById(sizeId);
    if (!size) {
      return {
        status: "ERROR",
        message: "Không tìm thấy size với ID đã cung cấp",
      };
    }

    const filter = {
      "variants.size": sizeId,
      isActive: true,
    };

    // Nếu có excludeProductId thì loại trừ sản phẩm hiện tại
    if (excludeProductId) {
      filter._id = { $ne: excludeProductId };
    }

    const products = await Product.find(filter)
      .populate("variants.size")
      .populate("category");

    return {
      status: "OK",
      message: "Lấy sản phẩm theo size thành công",
      data: products,
    };
  } catch (error) {
    console.error("Lỗi trong getProductsBySize:", error);
    return {
      status: "ERROR",
      message: "Không thể lấy sản phẩm theo size",
    };
  }
};


module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  hideProduct,
  showProduct,
  getHighlightProducts,
  getProductsBySize,
};
