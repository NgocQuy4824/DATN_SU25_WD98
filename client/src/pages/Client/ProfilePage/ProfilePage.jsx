import React, { useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Avatar,
  Skeleton,
  Breadcrumb,
  Modal,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../../hooks/useUsersHook";
import ProfileForm from "./ProfileForm"; //  file form cập nhật

const { Title } = Typography;

const ProfilePage = () => {
  const { user, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGetProfile();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUpdateInfo = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (!user || isAuthLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }

  return (
    <>
      <Breadcrumb style={{ marginBottom: 24, paddingLeft: '150px' }}>
        <Breadcrumb.Item onClick={() => navigate('/')} style={{ cursor: "pointer" }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin người dùng</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[32, 32]} justify="center" style={{ padding: "40px 20px" }}>
        {/* Sidebar */}
        <Col xs={24} md={6}>
          <Card
            style={{ textAlign: "center", border: "none", background: "transparent" }}
            bodyStyle={{ padding: 0 }}
          >
            <Avatar
              size={120}
              icon={<UserOutlined />}
              src={user.avatar || user.imageUrlRef}
              style={{ marginBottom: 16 }}
            />
            <Title level={5}>{user.name}</Title>
            <div style={{ marginTop: 24 }}>
              <Button block type="primary" style={{ marginBottom: 8 }}>
                Tài khoản
              </Button>
              <Button block>Đơn hàng</Button>
              {user.role === "admin" && (
                <Button block style={{ marginTop: 8 }}>
                  Quản lý Admin
                </Button>
              )}
              <Button block style={{ marginTop: 24 }} danger onClick={handleLogout}>
                Đăng xuất
              </Button>
            </div>
          </Card>
        </Col>

        {/* Thông tin người dùng */}
        <Col xs={24} md={12}>
          <Card title="Thông Tin Của Tôi" bordered={false}>
            <Form layout="vertical">
              <Form.Item label="Avatar">
                <Avatar
                  size={100}
                  src={user.avatar || user.imageUrlRef}
                  icon={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item label="Họ và tên">
                <Input value={user.name} disabled />
              </Form.Item>

              <Form.Item label="Số điện thoại">
                <Input value={user.phone || "Chưa cập nhật"} disabled />
              </Form.Item>

              <Form.Item label="Email">
                <Input value={user.email} disabled />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Button block type="primary" onClick={handleUpdateInfo}>
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
        </Col>
      </Row>

      {/*  Modal chứa form cập nhật thông tin */}
      <Modal
        open={isModalOpen}
        title="Cập nhật thông tin"
        footer={null}
        onCancel={handleModalClose}
        destroyOnClose
      >
        <ProfileForm onSuccess={handleModalClose} />
      </Modal>
    </>
  );
};

export default ProfilePage;
