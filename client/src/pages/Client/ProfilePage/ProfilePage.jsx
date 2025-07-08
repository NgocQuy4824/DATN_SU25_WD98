import React from "react";
import { Card, Typography, Avatar, Button, Row, Col, Breadcrumb, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfile } from "../../../hooks/useUsersHook";
import ProfileForm from "./ProfileForm";

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
      <Breadcrumb style={{ marginBottom: 24, paddingLeft: '150px' }}>
        <Breadcrumb.Item onClick={() => navigate('/')} style={{ cursor: "pointer" }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin người dùng</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[32, 32]} justify="center" style={{ padding: "40px 20px" }}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center", border: "none", background: "transparent" }} bodyStyle={{ padding: 0 }}>
            <Avatar size={120} icon={<UserOutlined />} src={user.imageUrlRef} style={{ marginBottom: 16 }} />
            <Title level={5}>{user.name}</Title>
            <div style={{ marginTop: 24 }}>
              <Button block type="primary" style={{ marginBottom: 8 }}>
                Tài khoản
              </Button>
              <Button block>Đơn hàng</Button>
              {user.role === "admin" && (
                <Button block style={{ marginTop: 8 }}>
                  <Link to="/system/admin/products" style={{ color: "inherit", textDecoration: "none" }}>
                    Quản lý Admin
                  </Link>
                </Button>
              )}
              <Button block style={{ marginTop: 24 }} danger onClick={handleLogout}>
                Đăng xuất
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <ProfileForm />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
