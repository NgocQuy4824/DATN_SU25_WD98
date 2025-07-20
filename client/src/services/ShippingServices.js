import API from "../config/app";

export const getAllProvince = async () => {
  const { data } = await API.get("/shipping/province");
  return data.data;
};

export const getALlDistrictByProvince = async (idProvince) => {
  const { data } = await API.get(`/shipping/district/${idProvince}`);
  return data.data;
};

export const getAllWardByDistrict = async (idDistrict) => {
  const { data } = await API.get(`/shipping/ward/${idDistrict}`);
  return data.data;
};
