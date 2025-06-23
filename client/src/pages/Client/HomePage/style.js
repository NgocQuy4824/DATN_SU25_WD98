import styled from "styled-components";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  border-bottom: 1px solid red;
  height: 44px;
`;

export const WrapperProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* căn giữa các sản phẩm */
  gap: 20px;
  margin: 20px auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0 12px;
`;
