import React from "react";
import { Layout, Breadcrumb } from "antd";
import SidebarFilter from "./SideBarFilter/SideBarFilter";
import ProductList from "./ProductList/ProductList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProductsByFilter } from "../../../hooks/useProductHook";


const { Sider, Content } = Layout;

export default function ProductPage() {

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const { data: products = [] } = useProductsByFilter(selectedSize, selectedColor);

  return (
    <Layout style={{ background: "#fff", padding: "24px" }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to='/'>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <Layout>
        <Sider width={200} style={{ background: "#fff", paddingRight: 16 }}>
          <SidebarFilter
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </Sider>
        <Content>
          <ProductList products={products} />
        </Content>
      </Layout>
    </Layout>
  );
}
