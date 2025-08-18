import { Button, Col, Dropdown, Menu } from "antd";
import { ShoppingCartOutlined, UserOutlined, GiftOutlined } from "@ant-design/icons";
import { WrapperHeader, WrapperHeaderLogo } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TopNavBar from "../Client/TopNavBar";
import ButtonInputSearch from "../Client/ButtonInputSearch/ButtonInputSearch";
import React from "react";
import { WrapperTypeProduct } from "../../pages/Client/HomePage/style";
import CategoryClient from "../../pages/Client/HomePage/CategoryClient/CategoryClient";

const HeaderComponent = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    user?.role === "admin" && {
      key: "admin",
      label: "Quản trị",
      onClick: () => navigate("/system/admin/products"),
    },
    {
      key: "profile",
      label: "Thông tin",
      onClick: () => navigate("/profile"),
    },
    {
      key: "orders",
      label: "Đơn hàng",
      onClick: () => navigate("/profile/orders"),
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ].filter(Boolean);

  const accountMenu = (
    <Menu
      items={menuItems.map(({ key, label, onClick, danger }) => ({
        key,
        label: <span onClick={onClick}>{label}</span>,
        danger,
      }))}
    />
  );

  return (
    <div>
      {!isAdmin && <TopNavBar />}
      <WrapperHeader>
        <WrapperHeaderLogo flex={1}>
          {isAdmin ? "Trang quản trị" : "PaceRun"}
        </WrapperHeaderLogo>

        {!isAdmin && (
          <WrapperTypeProduct>
            <Link
              to="/products"
              style={{
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#1890ff",
              }}
            >
              Sản phẩm
            </Link>
            <CategoryClient />
          </WrapperTypeProduct>
        )}


        {isAdmin && (
          <div style={{ paddingLeft: "20px" }}>
            <Button type="primary" onClick={() => navigate("/")}>
              Về trang chủ
            </Button>
          </div>
        )}

        {/* {!isAdmin && (
          
        )} */}

        {!isAdmin && (
          <Col
            flex={2}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div
              style={{ marginRight: "13px", cursor: "pointer", display: "flex", alignItems: "center"}}
              onClick={() => navigate("/my-vouchers")}
            >
              <div style={{ flex: "none", paddingLeft: "20px",marginRight: "20px" }}>
                <ButtonInputSearch />
              </div>
              <GiftOutlined style={{ fontSize: 18, color: '#ff4d4f', marginRight: "5px" }} />
              Mã giảm giá
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {user ? (
                <Dropdown overlay={accountMenu} placement="bottomRight" arrow>
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      // minWidth:"140px",
                      gap: 6,
                    }}
                  >
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <div>Tài khoản</div>
                  </div>
                </Dropdown>
              ) : (
                <>
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    <UserOutlined />
                    <span>Đăng ký</span>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onClick={() => navigate("/signin")}
                  >
                    <UserOutlined />
                    <span>Đăng nhập</span>
                  </div>
                </>
              )}

              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartOutlined style={{ color: '#1890ff' }} />
                <span>Giỏ hàng</span>
              </div>
            </div>
          </Col>
        )}
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
