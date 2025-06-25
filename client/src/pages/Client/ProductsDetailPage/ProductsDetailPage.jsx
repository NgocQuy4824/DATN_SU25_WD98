import React, { useEffect, useState } from "react";

import { useParams, useLocation, Link } from "react-router-dom";
import { useSizeOptions } from "../../../hooks/useSizeOptions";
import { Spin, Typography, Tag, Button, Radio, Breadcrumb } from "antd";
import styled from "styled-components";
import { useProductDetail } from "../../../hooks/useProductHook";

import ClauseComponent from "../../../components/ClauseComponent/ClauseComponent";
import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 24px auto;
  padding: 24px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  background-color: #fafafa;
`;

const TopSection = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  width: 400px;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
`;

const Thumbnails = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
`;

const ThumbnailImage = styled.img`
  width: calc((100% - 16px) / 3);
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  &:hover {
    border: 2px solid #1890ff;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PriceSection = styled.div`
  background-color: #f2f2f2;
  padding: 12px 16px;

  display: inline-block;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: red;
`;

const OldPrice = styled.span`
  font-size: 16px;
  color: #888;
  text-decoration: line-through;
  margin-left: 12px;
`;

const Discount = styled.span`
  font-size: 18px;
  color: red;
  margin-left: 12px;
`;

const OptionGroup = styled.div`
  margin-top: 5px;
`;

const StyledRadioButton = styled(Radio.Button)`
  padding: 3px 6px;
  font-size: 10px;
  min-width: 0px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioGroupWrapper = styled(Radio.Group)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;

  & button {
    width: 32px;
    height: 32px;
    border: none;
    background: rgb(224, 222, 222);
    font-size: 18px;
    cursor: pointer;
  }

  & span {
    width: 40px;
    text-align: center;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const BuyButton = styled(Button)`
  background-color: red !important;
  border-color: red !important;
  color: #fff !important;
`;

const DescriptionWrapper = styled.div`
  margin-top: 24px;
  position: relative;
`;

const ClampedParagraph = styled(Paragraph)`
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "none" : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ToggleButton = styled.div`
  color: #1890ff;
  cursor: pointer;
  margin-top: 8px;
  user-select: none;
`;

const ProductsDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data, isLoading } = useProductDetail(id);
  const { sizeMap } = useSizeOptions();
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [activeVariant, setActiveVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const product = data?.data;

  useEffect(() => {
    if (product?.variants?.length) {
      setActiveVariant(product.variants[0]);
      setActiveImage(product.variants[0].image);
      setSelectedColor(product.variants[0].color);
    }
  }, [product]);

  if (isLoading) return <Spin fullscreen />;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  const colors = [...new Set(product.variants.map((v) => v.color))];

  const availableSizes = product.variants
    .filter((v) => v.color === selectedColor)
    .map((v) => v.size);

  const totalStock = product.variants.reduce(
    (acc, v) => acc + (v.countInStock || 0),
    0
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    const variant = product.variants.find((v) => v.color === color);
    if (variant) {
      setActiveVariant(variant);
      setActiveImage(variant.image);
    }
  };

  const from = location.state?.from;

  let breadcrumbItems = [{ title: <Link to="/">Trang chủ</Link> }];

  if (from === "products") {
    breadcrumbItems.push({ title: <Link to="/products">Sản phẩm</Link> });
  }

  breadcrumbItems.push({ title: "Trang chi tiết" });

  return (
    <>
      <Breadcrumb
        separator=">"
        style={{ margin: "8px 120px 24px" }}
        items={breadcrumbItems}
      />
      <Wrapper>
        <TopSection>
          <ImageWrapper>
            <Image src={activeImage} alt="product" />
            <Thumbnails>
              {product.variants.map((variant, index) => (
                <ThumbnailImage
                  key={index}
                  src={variant.image}
                  alt={`variant-${index}`}
                  onClick={() => {
                    setActiveImage(variant.image);
                    setSelectedColor(variant.color);
                    setSelectedSize(null);
                    setActiveVariant(variant);
                  }}
                  className={activeImage === variant.image ? "active" : ""}
                />
              ))}
            </Thumbnails>
          </ImageWrapper>

          <InfoSection>
            <Title level={3}>{product.name}</Title>
            <div>
              <Tag color="blue">Danh mục: {product.category?.name}</Tag>
            </div>
            <PriceSection>
              <Price>
                ₫
                {Math.floor(
                  product.price * (1 - product.discount / 100)
                ).toLocaleString()}
                <OldPrice>
                  ₫{Math.floor(product.price).toLocaleString()}
                </OldPrice>
                <Discount>Giảm {product.discount}%</Discount>
              </Price>
            </PriceSection>
            <OptionGroup>
              <div>
                <strong>Màu sắc:</strong>
              </div>
              <RadioGroupWrapper
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
              >
                {colors.map((color, i) => (
                  <StyledRadioButton key={i} value={color}>
                    {color}
                  </StyledRadioButton>
                ))}
              </RadioGroupWrapper>
            </OptionGroup>

            <OptionGroup>
              <div>
                <strong>Kích thước:</strong>
              </div>
              <RadioGroupWrapper
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {availableSizes.map((size, i) => (
                  <StyledRadioButton key={i} value={size}>
                    {sizeMap[size] || size}
                  </StyledRadioButton>
                ))}
              </RadioGroupWrapper>
            </OptionGroup>

            <QuantityWrapper>
              <strong>Số lượng:</strong>
              <QuantityControl>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </QuantityControl>
              <span>SL sản phẩm còn lại: {totalStock}</span>
            </QuantityWrapper>

            <ActionButtons>
              <Button
                type="primary"
                icon={
                  <i className="fa fa-cart-plus">
                    <ShoppingCartOutlined />
                  </i>
                }
              >
                Thêm vào giỏ hàng
              </Button>

              <BuyButton icon={<ThunderboltOutlined />}>Mua ngay</BuyButton>
            </ActionButtons>

            <DescriptionWrapper>
              <Title level={4}>Mô tả sản phẩm</Title>
              <ClampedParagraph expanded={showFullDesc}>
                {product.description}
              </ClampedParagraph>
              {product.description?.length > 200 && (
                <ToggleButton onClick={() => setShowFullDesc(!showFullDesc)}>
                  {showFullDesc ? "Ẩn bớt ▲" : "Xem thêm ▼"}
                </ToggleButton>
              )}
            </DescriptionWrapper>
          </InfoSection>
        </TopSection>
      </Wrapper>
      <ClauseComponent />
    </>
  );
};

export default ProductsDetailPage;
