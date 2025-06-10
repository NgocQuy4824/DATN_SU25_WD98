const { assert } = require("joi");
const ProductType = require("../models/TypeProductModel");

const createTypeProduct = async (name) => {
  try {
    const checkType = await ProductType.findOne({ name });
    if (checkType) {
      return { status: "ERROR", message: "Loại sản phẩm đã tồn tại" };
    }

    const newType = await ProductType.create({ name });
    return { status: "OK", message: "Tạo thành công", data: newType };
  } catch (error) {
    console.error(error);
  }
};

const updateTypeProduct = async (id, name) => {
  try {
    const updated = await ProductType.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updated) {
      return { status: "ERROR", message: "Không tìm thấy loại sản phẩm" };
    }
    return { status: "OK", message: "Cập nhật thành công", data: updated };
  } catch (error) {
    console.error(error);
    return { status: "ERROR", message: "Cập nhật thất bại" };
  }
};

const deleteTypeProduct = async (id) => {
  try{
    const existingType = await ProductType.findById(id);
    if (!existingType) {
      return {
        status: "error",
        message:"khong tim thay loai san pham"
      };
    }
    await ProductType.findByIdAndDelete(id);
    return {
      status: "OK",
      message:"xoa thanh cong"

    };
  }catch (error) {
    console.error(error);
    return {
     status: "ERROR",
     message: "Xoá loại sản phẩm thất bại"
};
  }
}


module.exports = {
  createTypeProduct,
  updateTypeProduct,
  deleteTypeProduct,
};
