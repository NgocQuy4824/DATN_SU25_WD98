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
