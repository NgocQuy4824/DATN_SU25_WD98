import React, { useState } from "react";
import { Card, Form, Input, Button, Avatar, Row, Col, Upload, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { updateProfileApi } from "../../../services/UserServices";

const ProfileForm = () => {
  const { user, setUser } = useAuth(); // thêm setUser
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(user.imageUrlRef || null);

  const handleChangeAvatar = ({ file }) => {
  if (file && file.type.startsWith("image/")) {
    setAvatarFile(file); // Lưu file để gửi
    const reader = new FileReader();
    reader.onload = () => setPreviewAvatar(reader.result);
    reader.readAsDataURL(file);
  } else {
    message.error("Chỉ hỗ trợ file ảnh");
  }
};


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone || "");
      formData.append("email", values.email);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      setLoading(true);
      const response = await updateProfileApi(formData);
      if (response.status === "OK") {
        message.success("Cập nhật thành công");
        setUser(response.data); // cập nhật user trong context
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (err) {
      console.log(err);
      message.error("Vui lòng nhập đúng thông tin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Cập nhật thông tin">
      <Form form={form} layout="vertical" initialValues={user}>
        <Form.Item label="Avatar">
          <Avatar size={100} src={previewAvatar} icon={<UserOutlined />} />
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleChangeAvatar}
          >
            <Button icon={<UploadOutlined />} style={{ marginTop: 10 }}>
              Chọn ảnh mới
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: "Bắt buộc!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Bắt buộc!" }]}>
          <Input disabled />
        </Form.Item>

        <Button type="primary" block loading={loading} onClick={handleSubmit}>
          Cập nhật
        </Button>
      </Form>
    </Card>
  );
};

export default ProfileForm;
