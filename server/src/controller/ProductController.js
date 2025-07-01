const ProductService = require("../services/ProductService");

//thêm sản phẩm
const createProduct = async (req, res) => {
  try {
    const {
      name = '',
      category = '',
      price = 0,
      discount = 0,
      description = '',
      variants,
      isActive,
    } = req.body;

    if (!name || !category || !price || !discount || !variants) {
      return res.status(400).json({ message: 'Bắt buộc phải nhập đầy đủ thông tin' });
    }

    const parsedVariants = JSON.parse(variants);

    // Lấy các biến thể cần upload ảnh mới
    const newImageVariants = parsedVariants.filter(v => !v.image);

    if (!req.files || req.files.length !== newImageVariants.length) {
      return res.status(400).json({ message: 'Số lượng ảnh không khớp với biến thể cần upload ảnh mới' });
    }

    let fileIndex = 0;
    parsedVariants.forEach((variant, index) => {
      if (!variant.image) {
        const file = req.files[fileIndex];
        if (file?.secure_url || file?.path) {
          variant.image = file.secure_url || file.path;
          fileIndex++;
        } else {
          throw new Error('Thiếu ảnh cho biến thể mới');
        }
      }
    });

    const response = await ProductService.createProduct({
      name,
      category,
      price,
      discount,
      description,
      variants: parsedVariants,
      isActive: isActive === 'false' ? false : true,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Lỗi createProduct:', error);
    return res.status(500).json({ message: 'Lỗi server khi tạo sản phẩm' });
  }
};






// cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const {
      name = '',
      category = '',
      price = 0,
      discount = 0,
      description = '',
      variants,
      isActive,
    } = req.body;

    if (!name || !category || !price || !discount || !variants) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const parsedVariants = JSON.parse(variants);
    let imageIndex = 0;

    parsedVariants.forEach((variant) => {
      if (!variant.image && req.files && req.files[imageIndex]) {
        // Gán ảnh mới từ req.files theo thứ tự
        const file = req.files[imageIndex];
        variant.image = file.secure_url || file.path || file.url;
        imageIndex++;
      }
    });

    const updated = await ProductService.updateProduct(req.params.id, {
      name,
      category,
      price,
      discount,
      description,
      variants: parsedVariants,
      isActive: isActive === 'false' ? false : true,
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error('Lỗi updateProduct:', error);
    return res.status(500).json({ message: 'Lỗi server khi cập nhật sản phẩm' });
  }
};





// lấy chi tiết sản phẩm
const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "ERROR",
        message: "ID sản phẩm không hợp lệ",
      });
    }
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
// xoa san pham
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "ERROR",
        message: "ID sản phẩm không hợp lệ",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    if (response.status === "ERROR") {
      // check sản phẩm có tồn tại hay không
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// getall product
const getAllProduct = async (req, res) => {
  try {
    const response = await ProductService.getAllProduct();
    if (response.status === "ERROR") {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

const hideProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "ERROR",
        message: "ID sản phẩm không hợp lệ",
      });
    }

    const response = await ProductService.hideProduct(productId);
    return res.status(response.status === "OK" ? 200 : 404).json(response);
  } catch (error) {
    console.log(error);
  }
};

const showProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "ERROR",
        message: "ID sản phẩm không hợp lệ",
      });
    }

    const response = await ProductService.showProduct(productId);
    return res.status(response.status === "OK" ? 200 : 404).json(response);
  } catch (error) {
    console.log(error);
  }
};

const getHighlightProducts = async (req, res) => {
  try {
    const response = await ProductService.getHighlightProducts();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Server error",
    });
  }
};

//hiển thị sp theo kích thước 
const getProductsBySize = async (req, res) => {
  try {
    const { sizeId } = req.params;
    const { excludeProductId } = req.query;

    if (!sizeId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Thiếu sizeId trong yêu cầu",
      });
    }

    const response = await ProductService.getProductsBySize(sizeId, excludeProductId);
    return res.status(response.status === "OK" ? 200 : 404).json(response);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo size:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "Lỗi server",
    });
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
  getProductsBySize
};
