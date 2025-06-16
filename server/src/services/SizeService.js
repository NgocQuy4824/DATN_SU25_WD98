const Size = require("../models/SizeModel");

const createSize = async (name) => {
  try {
    const checkSize = await Size.findOne({ name });
    if (checkSize) {
      return { status: "ERROR", message: "Size đã tồn tại" };
    }

    const newSize = await Size.create({ name });
    return { status: "OK", message: "Tạo size thành công", data: newSize };
  } catch (error) {
    console.error(error);
  }
};

const updateSize = async (id, newName) => {
  try {
    const existingSize = await Size.findById(id);
    if (!existingSize) {
      return { status: "ERROR", message: "Không tìm thấy size" };
    }

    // Kiểm tra xem tên mới đã tồn tại chưa
    const duplicate = await Size.findOne({ name: newName });
    if (duplicate && duplicate._id.toString() !== id) {
      return { status: "ERROR", message: "Tên size đã tồn tại" };
    }

    existingSize.name = newName;
    await existingSize.save();

    return {
      status: "OK",
      message: "Cập nhật size thành công",
      data: existingSize,
    };
  } catch (error) {
    console.error(error);
    return { status: "ERROR", message: "Đã xảy ra lỗi khi cập nhật" };
  }
};

module.exports = {
  createSize,
  updateSize,
};
