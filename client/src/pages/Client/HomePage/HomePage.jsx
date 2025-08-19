import React, { useRef, useState } from "react";
import {
  ScrollButton,
  Title,
  WrapperProductList,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import anh4 from "../../asset/images/anh4.jpg";
import anh5 from "../../asset/images/anh5.jpg";
import ProductCard from "./ProductCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  useGetAllProducts,
  useHighlightProducts,
} from "../../../hooks/useProductHook";

import ClauseComponent from "../../../components/ClauseComponent/ClauseComponent";
import Footer from "../../../components/FooterComponent/FooterComponent";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import CategoryClient from "./CategoryClient/CategoryClient";
import ProductWrapper from "../../../components/SlideProducts/SlideProducts";

const HomePage = () => {
  const scrollRef = useRef();

  const { data, isLoading } = useHighlightProducts();
  const products = data?.data || [];

  const { data: allProductData } = useGetAllProducts();
  const allProducts = allProductData?.data || [];

  const sortedProducts = [...allProducts]
    .filter((product) => product.isActive)
    .reverse(); // giữ nguyên thứ tự thêm đầu tiên

  const [visibleRows, setVisibleRows] = useState(1);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 250 + 20;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const visibleProducts = sortedProducts.slice(0, visibleRows * 6);

  const canShowMore = visibleRows * 6 < sortedProducts.length;

  return (
    <>
      <div style={{ padding: "0 120px", overflow: "hidden" }}>
        <SliderComponent arrImages={[anh4, anh5]} />
        <ClauseComponent />

        <Title>Sản phẩm nổi bật</Title>
        {/* <div style={{ position: "relative" }}>
          {products.length > 5 && (
            <>
              <ScrollButton left onClick={() => handleScroll("left")}>
                <LeftOutlined />
              </ScrollButton>
              <ScrollButton right onClick={() => handleScroll("right")}>
                <RightOutlined />
              </ScrollButton>
            </>
          )}
          <WrapperProductList ref={scrollRef}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isLoading={isLoading}
              />
            ))}
          </WrapperProductList>
        </div> */}
        <ProductWrapper data={products} />

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #ddd",
            margin: "32px 0",
          }}
        />

        <Title>Sản phẩm</Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Space>
            {canShowMore && (
              <Button onClick={() => setVisibleRows(visibleRows + 1)}>
                Xem thêm
              </Button>
            )}
            {visibleRows > 1 && (
              <Button onClick={() => setVisibleRows(1)} danger>
                Thu gọn
              </Button>
            )}
          </Space>
        </div>
      </div>
    </>
  );
};

export default HomePage;
