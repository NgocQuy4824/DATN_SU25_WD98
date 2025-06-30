import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/users", // Đúng port backend
  withCredentials: true,
});

export const getAllUsers = async () => {
  const response = await API.get("/all");
  const sortedData = {
    ...response.data,
    data: [...response.data.data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  };
  return sortedData;
};

export const getProfileApi = async () => {
  const response = await API.get("/profile");
  return { ...response.data };
};

export const updateProfileApi = async (formData, token) => {
  const res = await API.patch("/profile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
