import React, { useState } from "react";
import { registerApi } from "../../../../services/AuthServices";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await registerApi(form);
      if (data.status === "OK") {
        setMessage("Đăng ký thành công! Vui lòng đăng nhập.");
      } else {
        setMessage(data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng ký</h2>
      <input
        type="text"
        name="name"
        placeholder="Họ tên"
        value={form.name}
        onChange={handleChange}
        required
      />
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
      <button type="submit">Đăng ký</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
