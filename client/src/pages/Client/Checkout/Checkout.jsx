import React from "react";
import ProductsCheckOutItems from "./_components/ProductsCheckOutItems";
import tw from "twin.macro";
import styled from "styled-components";
const WrapperLayoutCheckout = styled.div`
  ${tw`grid grid-cols-[2fr,1fr] gap-12 mx-6 mt-8 items-start`}
`;
export default function Checkout() {
  return (
    <WrapperLayoutCheckout>
      <ProductsCheckOutItems />
    </WrapperLayoutCheckout>
  );
}
