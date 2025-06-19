
import API from '../config/app.js'

export const getAllProducts = async () => {
  const response = await API.get('/product/get-all');
  const sortedData = {
    ...response.data,
    data: [...response.data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };
  return sortedData;
};

export const deleteProduct = async (productId) => {
  const response = await API.delete(`/product/delete/${productId}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await API.post('/product/create', productData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};


export const updateProduct = async ({ id, formData }) => {
  const res = await API.put(`/product/update/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};


export const hideProduct = async (productId) => {
  const response = await API.patch(`/product/hide/${productId}`);
  return response.data;
};

export const showProduct = async (productId) => {
  const response = await API.patch(`/product/show/${productId}`);
  return response.data;
};
