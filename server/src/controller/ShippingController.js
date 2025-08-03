const axios = require("axios");

const getProvince = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://production.cas.so/address-kit/2025-07-01/provinces`
    );
    const newResponse = data?.provinces?.map((item) => {
      return {
        name: item.name,
        _id: item.code,
      };
    });
    return res.status(200).json({
      data: newResponse,
      success: true,
    });
  } catch (error) {
    return res.status(500);
  }
};

const getWard = async (req, res) => {
  try {
    const { provinceId } = req.params;
    if (!provinceId) {
      return res.status(400).json({
        message: "Yêu cầu có province Id để lấy được danh sách Phường xã",
        success: false,
      });
    }
    const { data } = await axios.get(
      `https://production.cas.so/address-kit/2025-07-01/provinces/${provinceId}/communes`
    );
    const response = data.communes.map((item) => {
      return {
        _id: item.code,
        provinceId: item.provinceCode,
        name: item.name,
      };
    });
    return res.status(200).json({
      data: response,
      success: true,
    });
  } catch (error) {
    return res.status(500);
  }
};

module.exports = {
  getProvince,
  getWard,
};
