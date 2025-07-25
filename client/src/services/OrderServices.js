import API from "../config/app";

export const getMyOrder = async (query) => {
  const params = { ...query };
  ["search", "searchField", "status"].forEach((key) => {
    if (!params[key]) delete params[key];
  });
  const { data } = await API.get("/orders/my-orders", { params });
  return data.data;
};
