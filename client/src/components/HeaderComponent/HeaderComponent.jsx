import { Col, Dropdown, Menu } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { WrapperHeader, WrapperHeaderLogo } from "./style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TopNavBar from "../Client/TopNavBar";
import ButtonInputSearch from "../Client/ButtonInputSearch/ButtonInputSearch";
import React from "react";

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
      onClick: () => navigate("/system/admin"),
    },
    {
      key: "profile",
      label: "Thông tin",
      onClick: () => navigate("/profile"),
    },
    {
      key: "orders",
      label: "Đơn hàng",
      onClick: () => navigate("/orders"),
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ].filter(Boolean);

  const accountMenu = (
    <Menu items={menuItems.map(({ key, label, onClick, danger }) => ({
      key,
      label: <span onClick={onClick}>{label}</span>,
      danger,
    }))} />
  );

  return (
    <div>
      {!isAdmin && <TopNavBar />}
      <WrapperHeader>
        <WrapperHeaderLogo flex={1}>PaceRun</WrapperHeaderLogo>

        {!isAdmin && (
          <div style={{ flex: "none" }}>
            <ButtonInputSearch />
          </div>
        )}

        <Col flex={2} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {user ? (
              <>
                <Dropdown overlay={accountMenu} placement="bottomRight" arrow>
                  <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    <UserOutlined />
                    <span>Tài khoản</span>
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <div
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                  onClick={() => navigate("/signup")}
                >
                  <UserOutlined />
                  <span>Đăng ký</span>
                </div>
                <div
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                  onClick={() => navigate("/signin")}
                >
                  <UserOutlined />
                  <span>Đăng nhập</span>
                </div>
              </>
            )}

            <div
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartOutlined />
              <span>Giỏ hàng</span>
            </div>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
