import React, { useState } from "react";
import { Card, Form, Input, Button, Upload, Avatar, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateProfileApi } from "../../../services/UserServices";
import { toast } from "react-toastify";

const UpdateProfilePage = () => {
  const { user, setUser } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [avatarFile, setAvatarFile] = useState(null);

  if (!user) {
    return <div>Loading...</div>; // hoặc Skeleton
  }

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const token = localStorage.getItem("accessToken");
      const updated = await updateProfileApi(formData, token);
      setUser(updated.data);
      message.success("Cập nhật thành công!");
      navigate("/profile");
    } catch (err) {
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <Card title="Cập nhật thông tin">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: user.name,
          phone: user.phone,
        }}
        onFinish={handleFinish}
      >
        <Form.Item label="Avatar">
          <Upload
            beforeUpload={(file) => {
              setAvatarFile(file);
              return false; // Ngăn antd tự upload
            }}
            showUploadList={false}
          >
            <Avatar
              size={100}
              icon={<UserOutlined />}
              src={
                avatarFile ? URL.createObjectURL(avatarFile) : user.imageUrlRef
              }
            />
            <div style={{ marginTop: 8 }}>
              <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Lưu thay đổi
        </Button>
      </Form>
    </Card>
  );
};

export default UpdateProfilePage;
