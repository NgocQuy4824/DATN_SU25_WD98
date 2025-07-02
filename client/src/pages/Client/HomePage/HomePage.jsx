import React from "react";
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
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useHighlightProducts } from "../../../hooks/useProductHook";

import ClauseComponent from "../../../components/ClauseComponent/ClauseComponent";
import Footer from "../../../components/FooterComponent/FooterComponent";
import { Link } from "react-router-dom";

const HomePage = () => {

  const scrollRef = useRef();

  const { data, isLoading } = useHighlightProducts();
  const products = data?.data || [];

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

  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          <Link to='/products' style={{textDecoration:"none"}} >Sản phẩm</Link>
        </WrapperTypeProduct>
        <SliderComponent arrImages={[anh4, anh5]} />
        <ClauseComponent />

        <Title>Sản phẩm nổi bật</Title>
        <div style={{ position: "relative" }}>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
