import styled from "styled-components";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  height: 44px;
  margin-left: 20px;
`;

export const WrapperProductList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 10px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const ScrollButton = styled.button`
  position: absolute;
  top: 35%;
  ${(props) => (props.left ? "left: -20px" : "right: -20px")};
  background: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 4px 8px;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0 12px;
`;
