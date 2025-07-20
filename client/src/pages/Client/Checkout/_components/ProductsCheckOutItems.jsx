import React from "react";
import { useSelector } from "react-redux";
import { useMyCart } from "../../../../hooks/useCartHook";
import { Button, Card, Form } from "antd";
import styled from "styled-components";
import tw from "twin.macro";
import "../checkOutStyle";
import { SubTitle } from "../checkOutStyle";

const DividerProductItems = styled.div`
  ${tw`border border-[#7f7f7f] shadow-lg p-12 rounded-lg max-h-[60vh]`}
`;

export default function ProductsCheckOutItems({ isShippingPage, form }) {
  const { items: cartItems } = useSelector((state) => state.cart);
  const { data, isLoading } = useMyCart();
  const handleContinueShipping = () => {
    if (form) {
      form.submit();
    }
  };
  return (
    <DividerProductItems>
      <SubTitle>Sản phẩm thanh toán</SubTitle>
      <div className="flex! "></div>
      {isShippingPage ? (
        <Button type="primary" onClick={handleContinueShipping}>
          Tiếp tục
        </Button>
      ) : (
        <Button type="primary">Thanh toán</Button>
      )}
    </DividerProductItems>
  );
}
