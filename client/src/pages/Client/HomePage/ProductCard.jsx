import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ModalAddToCart from "../Cart/ModalAddToCart/ModalAddToCart";

const Card = styled.div`
  width: 230px;
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
  position: relative;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:hover .add-to-cart-btn {
    opacity: 1;
    transform: translate(-50%, 0);
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

const AddToCartButton = styled.button`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translate(-50%, 10px);
  opacity: 0;
  transition: all 0.3s ease;

  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 8px;

  width: 100%;
  height: 50px;

  font-size: 16px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;

  &:hover {
    background-color: #0958d9;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AuthBadge = styled.div`
  display: inline-block;
  background-color: #fef0f0;
  color: #d0011b;
  padding: 4px 6px;
  border-radius: 4px;
  margin-bottom: 4px;
  width: fit-content;
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState(firstVariant);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(firstVariant?.size);
  const [selectedColor, setSelectedColor] = useState(firstVariant?.color);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
    //api giỏ hàng
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        onClick={() =>
          navigate(`/products/${product._id}`, { state: { from: "home" } })
        }
      >
        <ImageWrapper>
          <ProductImage src={firstVariant?.image} alt={product.name} />
          <AddToCartButton
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <ShoppingCartOutlined style={{ fontSize: 24 }} /> Thêm giỏ hàng
          </AddToCartButton>
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

      <ModalAddToCart
        open={isModalOpen}
        onClose={handleCloseModal}
        product={product}
        variants={product.variants}
        variant={selectedVariant}
        quantity={quantity}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </>
  );
};

export default ProductCard;
