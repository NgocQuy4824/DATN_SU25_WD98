import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { Link } from "react-router-dom";
import { loginApi } from "../../../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const SignInPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await loginApi(values);
      localStorage.setItem("token", res.data.token);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message?.[0] ||
          err.response?.data?.message ||
          "Đăng nhập thất bại"
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Login form failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Đăng nhập
        </Title>
        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
            <Text>Chưa có tài khoản? </Text>
            <Link to="/signup">Đăng ký</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;
