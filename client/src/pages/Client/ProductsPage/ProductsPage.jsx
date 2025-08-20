import React from "react";
import { Layout, Breadcrumb } from "antd";
import SidebarFilter from "./SideBarFilter/SideBarFilter";
import ProductList from "./ProductList/ProductList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProductsByFilter } from "../../../hooks/useProductHook";
import Footer from "../../../components/FooterComponent/FooterComponent";
import { useProductFilter } from "../../../context/ProductFilterContext";

const { Sider, Content } = Layout;

export default function ProductPage() {
  const { selectedCategory, setSelectedCategory, resetCategory } =
    useProductFilter();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sortOption, setSortOption] = useState("newprice");

  const { data: products = [], refetch } = useProductsByFilter(
    selectedSize,
    selectedColor,
    selectedCategory
  );

  const handleResetFilters = () => {
    resetCategory();
    setSelectedSize(null);
    setSelectedColor(null);
    setSortOption("newprice");
    refetch?.(); // gọi refetch nếu hook có hỗ trợ
  };

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
            products={products}
            sortOption={sortOption}
            setSortOption={setSortOption}
            onResetFilters={handleResetFilters}
          />
        </Content>
      </Layout>{" "}
      <br />
      {/* <Footer /> */}
    </Layout>
  );
}
