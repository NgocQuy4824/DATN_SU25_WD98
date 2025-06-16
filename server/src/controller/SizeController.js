const Size = require("../models/SizeModel");

// Lấy tất cả size
const getAllSizes = async(req, res) => {
    try {
        const sizes = await Size.find().sort({ name: 1 });
        return res.status(200).json({ status: "OK", data: sizes });
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: "Không thể lấy danh sách size",
            error: error.message,
        });
    }
};

// Xem chi tiết size
const getSizeDetail = async(req, res) => {
    try {
        const { id } = req.params;
        const size = await Size.findById(id);

        if (!size) {
            return res.status(404).json({ status: "ERROR", message: "Không tìm thấy size" });
        }

        return res.status(200).json({ status: "OK", data: size });
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: "Lỗi khi lấy chi tiết size",
            error: error.message,
        });
    }
};

// Tạo mới size
const createSize = async(req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === "") {
            return res.status(400).json({ status: "ERROR", message: "Tên size không được để trống" });
        }

        const normalized = name.trim().toLowerCase();
        const checkSize = await Size.findOne({ name: normalized });

        if (checkSize) {
            return res.status(409).json({ status: "ERROR", message: "Size đã tồn tại" });
        }

        const newSize = await Size.create({ name: normalized });
        return res.status(201).json({ status: "OK", message: "Tạo size thành công", data: newSize });
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: "Lỗi khi tạo size",
            error: error.message,
        });
    }
};

// Cập nhật size
const updateSize = async(req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ status: "ERROR", message: "Tên size không được để trống" });
        }

        const normalized = name.trim().toLowerCase();
        const existing = await Size.findOne({ name: normalized });

        if (existing && existing._id.toString() !== id) {
            return res.status(409).json({ status: "ERROR", message: "Tên size đã tồn tại" });
        }

        const updated = await Size.findByIdAndUpdate(
            id, { name: normalized }, { new: true }
        );

        if (!updated) {
            return res.status(404).json({ status: "ERROR", message: "Không tìm thấy size để cập nhật" });
        }

        return res.status(200).json({ status: "OK", message: "Cập nhật thành công", data: updated });
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: "Lỗi khi cập nhật size",
            error: error.message,
        });
    }
};

// Xóa size
const deleteSize = async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Size.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ status: "ERROR", message: "Không tìm thấy size để xoá" });
        }

        return res.status(200).json({ status: "OK", message: "Xoá size thành công" });
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: "Lỗi khi xoá size",
            error: error.message,
        });
    }
};

module.exports = {
    getAllSizes,
    getSizeDetail,
    createSize,
    updateSize,
    deleteSize,
};