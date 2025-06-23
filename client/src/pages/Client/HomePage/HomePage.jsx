import React, { useEffect, useState } from "react";
import TypeProducts from "../../../components/Client/TypeProducts/TypeProducts";
import { Title, WrapperProductList, WrapperTypeProduct } from "./style";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import slider1 from "../../asset/images/slider1.webp";
import slider2 from "../../asset/images/slider2.webp";
import { getAllProducts } from "../../../services/ProductServices";
import ProductCard from "./ProductCard";

const HomePage = () => {
  const arrType = [
    { id: 1, name: "Giày Nam" },
    { id: 2, name: "Giày Nữ" },
    { id: 3, name: "Giày Trẻ Em" },
    { id: 4, name: "Phụ Kiện" },
    { id: 5, name: "Khuyến Mãi" },
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      if (response && response.data) {
        setProducts(response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "0 120px" }}>
      <SliderComponent arrImages={[slider1, slider2]} />
      <WrapperTypeProduct>
        {arrType.map((item) => (
          <TypeProducts key={item.id} name={item.name} />
        ))}
      </WrapperTypeProduct>
      HomePage
      <Title>Sản phẩm nổi bật</Title>
      <WrapperProductList>
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </WrapperProductList>
    </div>
  );
};

export default HomePage;
