import React from "react";
import TypeProducts from "../../../components/Client/TypeProducts/TypeProducts";
import { WrapperTypeProduct } from "./style";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import slider1 from "../../asset/images/slider1.webp";
import slider2 from "../../asset/images/slider2.webp";

const HomePage = () => {
  const arrType = [
    { id: 1, name: "Giày Nam" },
    { id: 2, name: "Giày Nữ" },
    { id: 3, name: "Giày Trẻ Em" },
    { id: 4, name: "Phụ Kiện" },
    { id: 5, name: "Khuyến Mãi" },
  ];
  return (
    <div style={{ padding: "0 120px" }}>
      <SliderComponent arrImages={[slider1, slider2]} />
      <WrapperTypeProduct>
        {arrType.map((item) => (
          <TypeProducts key={item.id} name={item.name} />
        ))}
      </WrapperTypeProduct>
      HomePage
    </div>
  );
};

export default HomePage;
