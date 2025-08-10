import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { registerApi } from "../../../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import tw from "twin.macro";
const { Title } = Typography;

const SignUpPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { confirm, ...submitData } = values;

    try {
      const res = await registerApi(submitData);

      if (res.status === "OK") {
        localStorage.setItem("token", res.data.token);
        toast.success(res.message || "Đăng ký thành công!");
        navigate("/signin");
      } else {
        toast.error(res.message || "Đăng ký thất bại");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message?.[0] ||
          err.response?.data?.message ||
          "Đăng ký thất bại"
      );
    }
  };

  return (
    <div
     tw="mt-[20%]"
      style={{
        height: "100vh",
      }}
    >
      <Title level={3} tw="uppercase">
        Đăng ký
      </Title>
      <p tw="text-lg text-[#777777] mt-4">
        Chào mừng bạn đã đến với{" "}
        <span tw="font-semibold text-[#f7c600]">PACERUN</span> — Nơi bước chân
        bạn bắt đầu hành trình hoàn hảo!
      </p>
      <Form
        tw="mt-6"
        form={form}
        name="signupForm"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input tw="h-[45px]" placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input tw="h-[45px]" placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          hasFeedback
        >
          <Input.Password tw="h-[45px]" placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password tw="h-[45px]" placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        <Form.Item>
          <button
            tw="h-[45px] bg-black text-white w-full cursor-pointer hover:opacity-80 rounded-[5px]"
            type="submit"
          >
            Đăng ký
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;
