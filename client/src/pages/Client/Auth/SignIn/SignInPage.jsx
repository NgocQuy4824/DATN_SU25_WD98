import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";
import { loginApi } from "../../../../services/AuthServices";
import tw from "twin.macro";
const { Title, Text } = Typography;

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      const res = await loginApi(values);
      const { accessToken, user } = res.data;
      login(accessToken, user);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div tw="mt-[20%]">
      <Title level={3} tw="uppercase">
        Đăng nhập
      </Title>
      <p tw="text-lg text-[#777777] mt-4">
        Chào mừng trở lại <span tw="font-semibold text-[#f7c600]">PACERUN</span>{" "}
        Đôi giày mới, trải nghiệm mới đang chờ bạn!
      </p>
      <Form layout="vertical" onFinish={onFinish} tw="mt-12">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input tw="h-[45px]" placeholder="Nhập email của bạn"/>
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password tw="h-[45px]" placeholder="Nhập mật khẩu của bạn"/>
        </Form.Item>
        <Form.Item  tw="flex justify-end">
          <Link to={'/'}>Quên mật khẩu?</Link>
        </Form.Item>
        <Form.Item tw="mt-6">
          <button
            tw="h-[45px] bg-black text-white w-full cursor-pointer hover:opacity-80 rounded-[5px]"
            type="submit"
          >
            Đăng nhập
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInPage;
