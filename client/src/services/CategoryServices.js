import API from "../config/app";

export const getAllCategory = async () => {
  const response = await API.get('/type-product/get-all');
  const sortedData = {
    ...response.data,
    data: [...response.data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };
  return sortedData;
};