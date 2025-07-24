import API from "../config/app";

export const createOrder = async (body) => {
  const { data } = await API.post("/orders/create", body);
  console.log(data);
  return data;
};
