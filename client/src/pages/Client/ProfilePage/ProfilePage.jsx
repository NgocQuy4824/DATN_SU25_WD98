import React from "react";
import { Card, Typography, Avatar, Button, Row, Col, Breadcrumb, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useGetProfile } from "../../../hooks/useUsersHook";

const { Title } = Typography;

const ProfilePage = () => {
  const { user, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useGetProfile();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user || isAuthLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }

  const isAccountTab = location.pathname === "/profile" || location.pathname === "/profile/";
  const isOrderTab = location.pathname === "/profile/orders";

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
              <Button 
                block 
                type={isAccountTab ? "primary" : "default"} 
                style={{ marginBottom: 8 }}
                onClick={() => navigate("/profile")}
              >
                Tài khoản
              </Button>
              <Button 
                block 
                type={isOrderTab ? "primary" : "default"} 
                onClick={() => navigate("/profile/orders")}
              >
                Đơn hàng
              </Button>
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

        <Col xs={24} md={16}>
          <Outlet /> 
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
