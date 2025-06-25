import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.status === "OK") {
        setMessage("Đăng nhập thành công!");
        // Lưu token vào localStorage nếu muốn
        // localStorage.setItem("token", data.data.token);
        // Chuyển hướng sang trang chính nếu cần
      } else {
        setMessage(data.message || "Đăng nhập thất bại!");
      }
    } catch {
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
