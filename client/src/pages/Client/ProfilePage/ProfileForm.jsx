import React from "react";
import { Card, Form, Input, Button, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";

const ProfileForm = () => {
  const { user } = useAuth();

  return (
    <Card title="Thông Tin Của Tôi" bordered={false}>
      <Form layout="vertical">
        <Form.Item label="Avatar">
          <Avatar size={100} src={user.imageUrlRef || undefined} icon={<UserOutlined />} />
        </Form.Item>

        <Form.Item label="Họ và tên">
          <Input value={user.name} disabled />
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <Input value={user.phone} disabled />
        </Form.Item>

        <Form.Item label="Email">
          <Input value={user.email} disabled />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Button block type="primary">
              Cập nhật thông tin
            </Button>
          </Col>
          <Col span={12}>
            <Button block type="primary" danger>
              Thay đổi mật khẩu
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ProfileForm;
