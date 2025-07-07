import React, { useState } from "react";
import { Card, Form, Input, Button, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { useUpdateProfile } from "../../../hooks/useUsersHook";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfileForm = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const updateProfileMutation = useUpdateProfile();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      updateProfileMutation.mutate(values, {
        onSuccess: () => setIsEditing(false),
      });
    });
  };

  return (
    <>
      <Card title="Thông Tin Của Tôi" bordered={false}>
        <Form layout="vertical" form={form} initialValues={user}>
          <Form.Item label="Avatar">
            <Avatar size={100} src={user.imageUrlRef || undefined} icon={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Họ và tên" name="name">
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled={!isEditing} />
          </Form.Item>

          <Row gutter={16}>
            {isEditing ? (
              <>
                <Col span={8}>
                  <Button block onClick={handleCancel}>Huỷ</Button>
                </Col>
                <Col span={16}>
                  <Button
                    block
                    type="primary"
                    onClick={handleSave}
                    loading={updateProfileMutation.isLoading}
                  >
                    Lưu thay đổi
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col span={12}>
                  <Button block type="primary" onClick={handleEdit}>
                    Cập nhật thông tin
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block type="primary" danger onClick={() => setShowChangePassword(true)}>
                    Thay đổi mật khẩu
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Card>

      <ChangePasswordModal visible={showChangePassword} onClose={() => setShowChangePassword(false)} />
    </>
  );
};

export default ProfileForm;
