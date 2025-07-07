import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Avatar, Upload, message, Row, Col } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { updateProfileApi } from "../../../services/UserServices";

const ProfileForm = ({ onSuccess }) => {
  const { user, updateUser } = useAuth(); // ✅ lấy updateUser
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  useEffect(() => {
    if (user?.imageUrlRef || user?.avatar) {
      setPreviewAvatar(user.imageUrlRef || user.avatar);
    }
    form.setFieldsValue({
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
    });
  }, [user, form]);

  const handleChangeAvatar = ({ file }) => {
    if (file && file.type.startsWith("image/")) {
      setAvatarFile(file);
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
      if (avatarFile) formData.append("avatar", avatarFile);

      setLoading(true);
      const res = await updateProfileApi(formData);

      if (res.status === "OK") {
        message.success("Cập nhật thành công 🎉");

        const newAvatar = res.data?.imageUrlRef || res.data?.avatar;
        if (newAvatar) {
          setPreviewAvatar(newAvatar);
        }

        updateUser(res.data);         // ✅ cập nhật cả context + localStorage
        if (onSuccess) onSuccess(res.data); // ✅ gọi callback lên cha (nếu có)

        setAvatarFile(null);
      } else {
        message.error(res.message || "Cập nhật thất bại");
      }
    } catch (err) {
      message.error("Vui lòng kiểm tra lại thông tin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Thông Tin Của Tôi">
      <Form form={form} layout="vertical">
        <Form.Item label="Avatar">
          <div style={{ position: "relative", width: 100, height: 100 }}>
            <Avatar
              size={100}
              src={previewAvatar}
              icon={<UserOutlined />}
              style={{ width: 100, height: 100 }}
            />
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleChangeAvatar}
              accept="image/*"
            >
              <Button
                icon={<UploadOutlined />}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </Upload>
          </div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
            Nhấn vào ảnh để thay đổi
          </div>
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { pattern: /^[0-9]{9,11}$/, message: "Số điện thoại không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

        <Row gutter={10}>
          <Col span={12}>
            <Button type="primary" block loading={loading} onClick={handleSubmit}>
              Cập nhật thông tin
            </Button>
          </Col>
          <Col span={12}>
            <Button danger block>
              Thay đổi mật khẩu
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ProfileForm;
