const TypeProductService = require("../services/TypeProductService");

const createTypeProduct = async (req, res) => {
  try {
    const { name = "" } = req.body;
    if (!name.trim()) {
      return res.status(400).json({ message: "Tên loại là bắt buộc" });
    }
    const response = await TypeProductService.createTypeProduct(name);

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};

const updateTypeProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await TypeProductService.updateTypeProduct(id, name);
  res.status(result.status === "OK" ? 200 : 400).json(result);
};

module.exports = {
  createTypeProduct,
  updateTypeProduct,
};
