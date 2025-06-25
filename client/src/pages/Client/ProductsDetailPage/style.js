import styled from "styled-components";

export const WrapperContainer = styled.div`
  display: flex;
  gap: 40px;
  padding: 40px 120px;
  flex-wrap: wrap;
;

export const WrapperImage = styled.div
  flex: 1;
  min-width: 300px;
  max-width: 500px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #eee;
  }
;

export const WrapperInfo = styled.div
  flex: 1;
  min-width: 300px;
;

export const WrapperTitle = styled.h1
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
;

export const Price = styled.div
  font-size: 24px;
  color: red;
  margin-bottom: 16px;
;

export const Description = styled.div
  font-size: 16px;
  margin-bottom: 24px;

  ul {
    margin-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }
;

export const AddToCartButton = styled.button
  padding: 12px 24px;
  font-size: 16px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #d9363e;
  }
;`;
