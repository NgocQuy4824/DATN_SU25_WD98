import React, { useEffect, useState } from "react";

import { useParams, useLocation, Link } from "react-router-dom";
import { useSizeOptions } from "../../../hooks/useSizeOptions";
import { Spin, Typography, Tag, Button, Radio, Breadcrumb } from "antd";

import { useProductDetail } from "../../../hooks/useProductHook";

import ClauseComponent from "../../../components/ClauseComponent/ClauseComponent";
import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import {
  ActionButtons,
  BuyButton,
  ClampedParagraph,
  DescriptionWrapper,
  Discount,
  Image,
  ImageWrapper,
  InfoSection,
  OldPrice,
  OptionGroup,
  Price,
  PriceSection,
  QuantityControl,
  QuantityWrapper,
  RadioGroupWrapper,
  StyledRadioButton,
  ThumbnailImage,
  Thumbnails,
  ToggleButton,
  TopSection,
  Wrapper,
} from "./style";

const { Title, Paragraph } = Typography;

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
