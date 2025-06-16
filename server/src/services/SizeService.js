const Size = require("../models/SizeModel");

const createSize = async(name) => {
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
const getAllSizes = async() => {
    try {
        const sizes = await Size.find().sort({ name: 1 });
        return { status: "OK", data: sizes };
    } catch (error) {
        return { status: "ERROR", message: "Không thể lấy danh sách size", error: error.message };
    }
};


module.exports = {
    createSize,
    getAllSizes,
};