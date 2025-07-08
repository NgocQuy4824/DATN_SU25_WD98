import React from "react";
import { Layout, Breadcrumb } from "antd";
import SidebarFilter from "./SideBarFilter/SideBarFilter";
import ProductList from "./ProductList/ProductList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProductsByFilter } from "../../../hooks/useProductHook";
import Footer from "../../../components/FooterComponent/FooterComponent";

const { Sider, Content } = Layout;

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const { data: products = [] } = useProductsByFilter(
    selectedSize,
    selectedColor,
    selectedCategory
  );
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Layout style={{ background: "#fff", padding: "24px" }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <Layout>
        <Sider width={200} style={{ background: "#fff", paddingRight: 16 }}>
          <SidebarFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </Sider>
        <Content>
          <ProductList
            sortedProducts={sortedProducts}
            onResetFilters={() => {
              setSelectedCategory(null);
              setSelectedSize(null);
              setSelectedColor(null);
            }}
          />
        </Content>
      </Layout>{" "}
      <br />
      <Footer />
    </Layout>
  );
}
