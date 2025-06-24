import React, { useEffect, useState } from "react";
import TypeProducts from "../../../components/Client/TypeProducts/TypeProducts";
import { ScrollButton, Title, WrapperProductList, WrapperTypeProduct } from "./style";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import anh4 from "../../asset/images/anh4.jpg"
import anh5 from "../../asset/images/anh5.jpg";
import { getHighlightProducts } from "../../../services/ProductServices";
import ProductCard from "./ProductCard";
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const HomePage = () => {
  const arrType = [
    { id: 1, name: "Giày Nam" },
    { id: 2, name: "Giày Nữ" },
    { id: 3, name: "Giày Trẻ Em" },
    { id: 4, name: "Phụ Kiện" },
    { id: 5, name: "Khuyến Mãi" },
  ];

  const [products, setProducts] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getHighlightProducts();
      if (response && response.data) {
        setProducts(response.data);
      }
    };
    fetchData();
  }, []);


  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 250 + 20;
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };


  return (
    <div style={{ padding: "0 120px" }}>
      <SliderComponent arrImages={[anh4, anh5]} />
      <WrapperTypeProduct>
        {arrType.map((item) => (
          <TypeProducts key={item.id} name={item.name} />
        ))}
      </WrapperTypeProduct>
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
            <ProductCard key={product._id} product={product} />
          ))}
        </WrapperProductList>
      </div>
    </div>
  );
};

export default HomePage;
