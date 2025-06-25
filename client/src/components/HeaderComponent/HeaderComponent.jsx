import React from "react";
import { Col } from "antd";
import TopNavBar from "../Client/TopNavBar";
import {
  IdcardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { WrapperHeader, WrapperHeaderLogo } from "./style";
import ButtonInputSearch from "../Client/ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HeaderComponent = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLoginClick = () => navigate("/signin");
  const handleRegisterClick = () => navigate("/signup");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {!isAdmin && <TopNavBar />}
      <WrapperHeader>
        <WrapperHeaderLogo flex={1} style={{ paddingRight: "10px" }}>
          PaceRun
        </WrapperHeaderLogo>

        {!isAdmin && (
          <div style={{ flex: "none" }}>
            <ButtonInputSearch />
          </div>
        )}

        <Col flex={2}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                whiteSpace: "nowrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <IdcardOutlined />
                <span>Tài Khoản</span>
              </div>

              {user ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                    }}
                  >
                    <UserOutlined />
                    <span>{user.name || "Đã đăng nhập"}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={handleLogout}
                  >
                    <LogoutOutlined />
                    <span>Đăng xuất</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                    }}
                    onClick={handleRegisterClick}
                  >
                    <UserOutlined />
                    <span>Đăng ký</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                    }}
                    onClick={handleLoginClick}
                  >
                    <UserOutlined />
                    <span>Đăng nhập</span>
                  </div>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartOutlined />
                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
