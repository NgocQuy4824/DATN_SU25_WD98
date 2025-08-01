import API from "../config/app";

export const createPaymentLinkAPI = async (body) => {
  const { data } = await API.post("/orders/payos/create", body);
  return data;
};
