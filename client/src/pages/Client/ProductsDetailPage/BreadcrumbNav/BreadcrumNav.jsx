import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const BreadcrumbsNav = ({ from }) => {
  const items = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: <Link to="/products">Sản phẩm</Link> },
    { title: "Trang chi tiết" },
  ];
  return (
    <Breadcrumb
      separator=">"
      style={{ margin: "8px 120px 24px" }}
      items={items}
    />
  );
};

export default BreadcrumbsNav;
