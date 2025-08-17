import React, { useEffect, useState } from "react";

import { useParams, useLocation } from "react-router-dom";
import { useSizeOptions } from "../../../hooks/useSizeOptions";
import { Spin, Typography, Tag, Button, Alert } from "antd";

import { useProductDetail } from "../../../hooks/useProductHook";
import tw from "twin.macro";
import ClauseComponent from "../../../components/ClauseComponent/ClauseComponent";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  ActionButtons,
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
  QuantityWrapper,
  RadioGroupWrapper,
  StyledRadioButton,
  ThumbnailImage,
  Thumbnails,
  ThumbnailWrapper,
  ToggleButton,
  TopSection,
  Wrapper,
} from "./style";
import ModalPickSize from "./ModalPickSize/ModalPickSize";
import ProductSameSize from "./ProductSameSize/ProductSameSize";
import BreadcrumbsNav from "./BreadcrumbNav/BreadcrumNav";
import { useAddToCart } from "../../../hooks/useCartHook";
import CartSide from "../Cart/CartSide/CartSide.jsx";
import { toast } from "react-toastify";
import UpdateQuantity from "../Cart/UpdateQuantity/UpdateQuantity.jsx";
import Footer from "../../../components/FooterComponent/FooterComponent.jsx";

const { Title } = Typography;

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { mutate: addToCart } = useAddToCart();

  const handleAddToCartClick = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Vui lòng chọn màu sắc và kích thước");
      return;
    }
    const variantToAdd = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
    if (!variantToAdd) {
      toast.error("Không tìm thấy biến thể phù hợp");
      return;
    }
    addToCart(
      {
        productId: product._id,
        variantId: variantToAdd._id,
        quantity,
      },
      {
        onSuccess: () => setCartDrawerOpen(true),
        onError: () => toast.error("Thêm vào giỏ thất bại"),
      }
    );
  };

  const from = location.state?.from;
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

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    const variant = product.variants.find((v) => v.color === color);
    if (variant) {
      setActiveVariant(variant);
      setActiveImage(variant.image);
    }
  };

  return (
    <>
      <BreadcrumbsNav from={from} />
      <Wrapper>
        <TopSection>
          <ImageWrapper>
            <Image src={activeImage} alt="product" />
            <Thumbnails>
              {product.variants.map((variant, index) => (
                <ThumbnailWrapper key={index}>
                  <ThumbnailImage
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
                </ThumbnailWrapper>
              ))}
            </Thumbnails>
          </ImageWrapper>

          <InfoSection>
            {!product.isActive && (
              <Alert
                message="Sản phẩm này hiện không còn hoạt động"
                description="Sản phẩm này đã bị ngừng kinh doanh hoặc tạm ẩn. Vui lòng quay lại sau hoặc chọn sản phẩm khác."
                type="warning"
                showIcon
                style={{ marginBottom: "10px" }}
              />
            )}
            <Title level={2}>{product.name}</Title>

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
                <p tw="text-base">Kích thước:</p>
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
                <p tw="text-base">Kích thước:</p>
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

            <QuantityWrapper
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <p tw="text-base mb-0 text-[#777777]">Số lượng:</p>
              <UpdateQuantity
                value={quantity}
                min={1}
                max={activeVariant?.countInStock}
                onChange={setQuantity}
              />
              <span tw="text-xs" style={{ color: "red" }}>
                Số lượng còn lại: {activeVariant?.countInStock}
              </span>
            </QuantityWrapper>

            <ActionButtons>
              <button
                className="btn-add-cart"
                tw="w-full h-[45px] text-base text-white bg-black duration-300  cursor-pointer"
                onClick={handleAddToCartClick}
                disabled={!product.isActive}
              >
                <ShoppingCartOutlined /> Thêm vào giỏ hàng
              </button>

              {/* <BuyButton icon={<ThunderboltOutlined />} disabled={!product.isActive}>Mua ngay</BuyButton> */}
            </ActionButtons>
            <div tw="mt-4">
              <Tag color="blue">Danh mục: {product.category?.name}</Tag>
            </div>
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
            <div
              onClick={() => setIsModalOpen(true)}
              style={{
                cursor: "pointer",
                color: "#1677ff",
                marginTop: "16px",
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                Hướng dẫn chọn Size
              </Title>
            </div>

            <ModalPickSize
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </InfoSection>
        </TopSection>{" "}
        <br />
        <ClauseComponent /> <br />
        <div>
          <h3 style={{ fontSize: "25px" }}>Sản phẩm gợi ý</h3>
          <ProductSameSize
            sizeId={activeVariant?.size}
            productId={product._id}
          />
        </div>
      </Wrapper>
      {/* phần hiển thị Modal giỏ hàng khi add ở trang chi tiết sản phẩm  */}
      <CartSide
        open={isCartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
      {/* <Footer /> */}
    </>
  );
};

export default ProductsDetailPage;
