const axios = require("axios");

const getProvince = async (req, res) => {
  try {
    const { data } = await axios.get(`https://provinces.open-api.vn/api/v1`);
    const newResponse = data.map((item) => {
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

const getDistrict = async (req, res) => {
  try {
    const { provinceId } = req.params;
    if (!provinceId) {
      return res.status(400).json({
        message: "Yêu cầu có province Id để lấy được danh sách quận huyện",
        success: false,
      });
    }
    const { data } = await axios.get(
      `https://provinces.open-api.vn/api/v1/p/${provinceId}?depth=2`
    );
    const response = data.districts.map((item) => {
      return {
        _id: item.code,
        provinceId: item.province_code,
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

const getWard = async (req, res) => {
  try {
    const { districtId } = req.params;
    if (!districtId) {
      return res.status(400).json({
        message: "Phải có id của quận huyện để lấy được xã phường",
        success: false,
      });
    }
    const { data } = await axios.get(
      `https://provinces.open-api.vn/api/v1/d/${districtId}?depth=2`
    );
    const response = data.wards.map((item) => {
      return {
        _id: item.code,
        name: item.name,
        districtId: item.district_code,
        provinceId: data.province_code,
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
  getDistrict,
  getWard,
};
