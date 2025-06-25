// src/services/authApi.js
import axios from "axios";

// Tạo instance axios riêng để tiện quản lý baseURL
const API = axios.create({
  baseURL: "http://localhost:3001/api/auth",
});

// Gọi API đăng ký
export const registerApi = async (data) => {
  const res = await API.post("/register", data);
  return res.data; // sẽ có: status, message, data.token, data.user
};

// Gọi API đăng nhập
export const loginApi = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};
