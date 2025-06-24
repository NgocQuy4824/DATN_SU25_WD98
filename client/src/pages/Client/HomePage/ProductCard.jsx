import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  width: 250px;
  height: 350px;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-color: #fafafa;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Luôn fit vừa khung hình, giữ tỉ lệ */
  display: block;
`;

const ProductContent = styled.div`
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const ProductName = styled.div`
  font-size: 18px;
  color: #222;
  font-weight: 00;
  margin-bottom: 4px;
  white-space: nowrap; /* Chỉ hiển thị 1 dòng */
  overflow: hidden; /* Ẩn phần vượt quá */
  text-overflow: ellipsis; /* Hiển thị dấu "..." */
`;

const AuthBadge = styled.div`
  display: inline-block;
  background-color: #fef0f0;
  color: #d0011b;
  font-size: 13px; /* Tăng kích thước chữ */
  font-weight: 600;
  padding: 2px 6px; /* Padding vừa với chữ */
  border-radius: 4px;
  margin-bottom: 4px;
  width: fit-content; /* Vừa với nội dung */
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Price = styled.div`
  color: #ee4d2d;
  font-size: 16px;
  font-weight: bold;
`;

const Discount = styled.div`
  background: #ffe5e5;
  color: #ee4d2d;
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 4px;
`;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const firstVariant = product?.variants?.[0];

  return (
    <Card onClick={() => navigate(`/product/${product._id}`)}>
      <ImageWrapper>
        <ProductImage src={firstVariant?.image} alt={product.name} />
      </ImageWrapper>
      <ProductContent>
        <ProductName>{product.name}</ProductName>
        <AuthBadge>Hàng chính hãng 100%</AuthBadge>
        <PriceRow>
          <Price>{(product.price || 0).toLocaleString()}₫</Price>
          {product.discount > 0 && <Discount>-{product.discount}%</Discount>}
        </PriceRow>
      </ProductContent>
    </Card>
  );
};

export default ProductCard;
