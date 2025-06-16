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

module.exports = {
  createSize,
};