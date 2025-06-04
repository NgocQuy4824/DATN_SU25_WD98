
import API from '../config/app.js'

export const getAllProducts = async () => {
  const response = await API.get('/product/get-all');
  return response.data;
}

export const createProduct = async (productData) => {
  const response = await API.post('/product/create', productData);
  return response.data;
};