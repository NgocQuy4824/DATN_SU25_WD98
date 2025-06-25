import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { loginApi } from "../../../services/authApi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await loginApi(form); // Gọi API từ service

      if (data.status === "OK") {
        const { token, user } = data.data;
        login(token, user); // Gọi login từ context
        setMessage("Đăng nhập thành công!");
        navigate("/");
      } else {
        setMessage(data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      console.error("Lỗi login:", err);
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Đăng nhập</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
