import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spin } from "antd";

export const PrivateRouter = ({ requiredRole }) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spin tip="Đang xác thực..." size="large" />
    </div>)
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}