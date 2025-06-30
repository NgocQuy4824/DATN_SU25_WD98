import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/auth",
  withCredentials: true, // để gửi cookie
});

export const registerApi = async (data) => {
  const res = await API.post("/register", data);
  return res.data;
};

export const loginApi = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};

export const refreshTokenApi = async () => {
  const res = await API.post("/refresh-token");
  return res.data;
};

export const logoutApi = async () => {
  const res = await API.post("/logout");
  return res.data;
};

export const updateProfileApi = async (data) => {
  // Nếu có upload file (avatar), dùng FormData
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  const res = await API.patch("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
