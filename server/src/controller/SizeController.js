const SizeService = require("../services/SizeService.js");

const createSize = async (req, res) => {
  try {
    const { name = "" } = req.body;
    if (!name.trim()) {
      return res.status(400).json({ message: "Tên size là bắt buộc" });
    }

    const response = await SizeService.createSize(name);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};

const updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { name = "" } = req.body;

    if (!name.trim()) {
      return res.status(400).json({ message: "Tên size là bắt buộc" });
    }

    const response = await SizeService.updateSize(id, name);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const getAllSizes = async (req, res) => {
  try {
    const response = await SizeService.getAllSizes();
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
const getSizeById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await SizeService.getSizeById(id);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi lấy size theo ID:", error);
    return res.status(500).json({ message: "Lỗi server khi lấy size" });
  }
};

module.exports = {
  createSize,
  updateSize,
  getAllSizes,
  getSizeById,
};
