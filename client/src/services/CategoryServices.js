import API from "../config/app";

export const getAllCategory = async () => {
  const response = await API.get("/type-product/get-all");
  const sortedData = {
    ...response.data,
    data: [...response.data.data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  };
  return sortedData;
}

export const updateCategoryById = async (id, updatedData) => {
  const response = await API.put(`/type-product/update/${id}`, updatedData);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await API.post('/type-product/create', categoryData);
  return response.data;
};

