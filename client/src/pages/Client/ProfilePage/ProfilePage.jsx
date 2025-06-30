import React from "react";
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
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../../hooks/useUsersHook";

const { Title } = Typography;

const ProfilePage = () => {
  const { user, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();

  useGetProfile();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user || isAuthLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: 24, paddingLeft: "150px", cursor: "pointer" }}
      >
        <Breadcrumb.Item
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin người dùng</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[32, 32]} justify="center" style={{ padding: "40px 20px" }}>
        <Col xs={24} md={6}>
          <Card
            style={{
              textAlign: "center",
              border: "none",
              background: "transparent",
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Avatar
              size={120}
              icon={<UserOutlined />}
              src={user.imageUrlRef}
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
              <Button
                block
                style={{ marginTop: 24 }}
                danger
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </div>
          </Card>
        </Col>

        {/* Main form */}
        <Col xs={24} md={12}>
          <Card title="Thông Tin Của Tôi" bordered={false}>
            <Form layout="vertical">
              <Form.Item label="Avatar">
                <Avatar
                  size={100}
                  src={user.imageUrlRef || undefined}
                  icon={<UserOutlined />}
                />
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
                  <Button
                    block
                    type="primary"
                    style={{ marginBottom: 8 }}
                    onClick={() => navigate("/profile/update")}
                  >
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
    </>
  );
};

export default ProfilePage;
