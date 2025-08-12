import API from "../config/app";

export const getMyOrder = async (query) => {
  const params = { ...query };
  ["search", "searchField", "status"].forEach((key) => {
    if (!params[key]) delete params[key];
  });
  const { data } = await API.get("/orders/my-orders", { params });
  return data.data;
};

export const getAllOrder = async (query) => {
  const params = { ...query };
  ["search", "searchField", "status"].forEach((key) => {
    if (!params[key]) delete params[key];
  });
  const { data } = await API.get("/orders/all", { params });
  return data;
};

export const getOrderDetail = async (id) => {
  const { data } = await API.get(`/orders/detail/${id}`);
  return data.data;
};

export const getMyDetailOrder = async (id) => {
  const { data } = await API.get(`/orders/my-orders/detail/${id}`);
  return data.data;
};

export const updateOrderStatus = async (id, body) => {
  const { data } = await API.patch(`/orders/update/${id}`, body);
  return data;
};

export const completeOrder = async (id) => {
  const { data } = await API.patch(`/orders/complete/${id}`);
  return data;
};

export const cancelOrder = async (id, body) => {
  const { data } = await API.patch(`/orders/cancel/${id}`, body);
  return data;
};

export const getAllBankInfo = async () => {
  const { data } = await API.get(`/orders/bank/all`);
  return data;
};

export const updateRefundInfo = async (orderId, body) => {
  const { data } = await API.patch(
    `/orders/refund/update-info/${orderId}`,
    body
  );
  return data;
};
