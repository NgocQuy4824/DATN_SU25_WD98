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

const getAllSizes = async () => {
  try {
    const sizes = await Size.find().sort({ createdAt: -1 }); // Sắp xếp mới nhất trước
    return {
      status: "OK",
      message: "Lấy danh sách size thành công",
      data: sizes,
    };
  } catch (error) {
    console.error(error);
    return { status: "ERROR", message: "Đã xảy ra lỗi khi lấy danh sách size" };
  }
};

const getSizeById = async (id) => {
  try {
    const size = await Size.findById(id);
    if (!size) {
      return { status: "ERROR", message: "Không tìm thấy size" };
    }

    return { status: "OK", data: size };
  } catch (error) {
    console.error("Lỗi khi lấy size theo ID:", error);
    return { status: "ERROR", message: "Lỗi server khi lấy size" };
  }
};

module.exports = {
  createSize,
  updateSize,
  getAllSizes,
  getSizeById, //
};
