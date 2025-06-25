const ProductService = require("../services/ProductService");

//thêm sản phẩm
const createProduct = async (req, res) => {

    try {
        const { name = '', category = '', price = 0, discount = 0, description = '', variants, isActive } = req.body;


        if (!name || !category || !price || !discount || !variants) {
            return res.status(400).json({ message: 'Bắt buộc phải nhập' });
        }

        // Parse variants (vì từ multipart/form-data là string)
        const parsedVariants = JSON.parse(variants);

        // Gắn link ảnh từ req.files vào variants
        const files = req.files;
        parsedVariants.forEach((variant, index) => {
            if (files[index]) {
                variant.image = `/uploads/${files[index].filename}`;
            }
        });

        const response = await ProductService.createProduct({
            name,
            category,
            price,
            discount,
            description,
            variants: parsedVariants,
            isActive: typeof isActive === 'string' ? isActive === 'true' : Boolean(isActive)
        });

        return res.status(response?.status === 'ERROR' ? 400 : 200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Lỗi server' });
    }
};

// cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {

    const productId = req.params.id;
    const {
      name = '',
      category = '',
      price = 0,
      discount = 0,
      description = '',
      variants
    } = req.body;

    if (!productId || !variants) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Thiếu dữ liệu đầu vào'
      });
    }

    const parsedVariants = JSON.parse(variants);
    const files = req.files || [];

    // Gắn ảnh mới nếu có, nếu không giữ ảnh cũ từ client
    parsedVariants.forEach((variant, index) => {
      if (files[index]) {
        variant.image = `/uploads/${files[index].filename}`;
      }
      // Nếu không có file thì giữ nguyên variant.image đã được client gửi
      // Nếu cả hai cùng không có thì đây là dữ liệu không hợp lệ
      if (!variant.image) {
        throw new Error(`Biến thể thứ ${index + 1} thiếu trường ảnh`);
      }
    });

    const dataUpdate = {
      name,
      category,
      price,
      discount,
      description,
      variants: parsedVariants,
    };

    if (req.body.isActive !== undefined) {
      dataUpdate.isActive = req.body.isActive;
    }

    const response = await ProductService.updateProduct(productId, dataUpdate);
    return res.status(response?.status === 'ERROR' ? 400 : 200).json(response);
  } catch (error) {
    console.log(error);
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

    if (!sizeId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Thiếu sizeId trong yêu cầu",
      });
    }

    const response = await ProductService.getProductsBySize(sizeId);
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
