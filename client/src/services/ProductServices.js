import API from "../config/app.js";

export const getAllProducts = async () => {
  const response = await API.get("/product/get-all");
  const sortedData = {
    ...response.data,
    data: [...response.data.data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  };
  return sortedData;
};

export const deleteProduct = async (productId) => {
  const response = await API.delete(`/product/delete/${productId}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await API.post("/product/create", productData);
  return response.data;
};

export const updateProduct = async (productId, updatedData) => {
  const response = await API.put(`/product/update/${productId}`, updatedData);
  return response.data;
};

export const hideProduct = async (productId) => {
  const response = await API.patch(`/product/hide/${productId}`);
  return response.data;
};

export const showProduct = async (productId) => {
  const response = await API.patch(`/product/show/${productId}`);
  return response.data;
};

export const getHighlightProducts = async () => {
  const response = await API.get("/product/get-highlight");
  return response.data;
};

export const getProductDetail = async (productId) => {
  const response = await API.get(`/product/details/${productId}`);
  return response.data;
};
