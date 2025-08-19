import React, { useState, useEffect } from 'react';
import { Drawer, Typography, Row, Col, Button, InputNumber } from 'antd';
import { useSizeOptions } from '../../../../hooks/useSizeOptions';
import { useAddToCart } from '../../../../hooks/useCartHook';
import CartSide from '../CartSide/CartSide';

const { Title, Text } = Typography;

// helper để lấy tên size an toàn
const getVariantSizeLabel = (variant, sizeMap) => {
  if (!variant?.size) return "";
  // Nếu size là object
  if (typeof variant.size === "object") {
    return sizeMap[variant.size._id] || variant.size.name || "";
  }
  // Nếu size là string
  return sizeMap[variant.size] || variant.size;
};

const ModalAddToCart = ({
  open,
  onClose,
  product,
  variants,          // tất cả biến thể
  variant,           // biến thể ban đầu
  quantity: initialQuantity,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variant);
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const { mutate: addToCart } = useAddToCart();
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

  const { sizeMap } = useSizeOptions();

  useEffect(() => {
    if (variant) setSelectedVariant(variant);
    if (initialQuantity) setQuantity(initialQuantity);
  }, [variant, open, initialQuantity]);

  if (!variant || !variants) return null;

  // Lấy số lượng tồn kho hiện tại
  const maxQuantity = selectedVariant.countInStock || 0;

  return (
    <>
      <Drawer
        title="Xác nhận thêm vào giỏ hàng"
        placement="bottom"
        open={open}
        onClose={onClose}
        height={480}
      >
        <Row gutter={16}>
          <Col span={8}>
            <img
              src={selectedVariant.image}
              alt={product.name}
              style={{ width: '100%', height: 300, objectFit: 'contain', borderRadius: 8, backgroundColor: '#f5f5f5', }}
            />
          </Col>
          <Col span={16}>
            <Title level={5}>{product.name}</Title>
            <Text>
              Giá: ₫{(product.price * (1 - product.discount / 100)).toLocaleString()}
            </Text>
            <br />
            <Text>Giảm giá: {product.discount}%</Text>
            <br />
            <Text>Màu sắc: {selectedVariant.color}</Text>
            <br />
            <Text>
              Kích thước: {getVariantSizeLabel(selectedVariant, sizeMap)}
            </Text>
            <br />
            <Text>
              Số lượng:
              <InputNumber
                min={1}
                max={maxQuantity}
                value={quantity}
                onChange={(value) => {
                  if (value > maxQuantity) {
                    setQuantity(maxQuantity);
                  } else {
                    setQuantity(value);
                  }
                }}
                style={{ marginLeft: 8, width: 80 }}
              />
            </Text>
            <br />
            <Text style={{ color: 'red' }}>Số lượng còn lại: {maxQuantity}</Text>
          </Col>
        </Row>

        <div style={{ marginTop: 16 }}>
          <Title level={5}>Chọn biến thể khác:</Title>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {variants.map((v) => (
              <div
                key={v._id}
                onClick={() => {
                  setSelectedVariant(v);
                  setQuantity(Math.min(quantity, v.countInStock || 1));
                }}
                style={{
                  border: v._id === selectedVariant._id ? '2px solid #1677ff' : '1px solid #ccc',
                  borderRadius: 6,
                  padding: 4,
                  width: 70,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <img src={v.image} alt="" style={{ width: '100%', borderRadius: 4 }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>Hủy</Button>
          <Button
            type="primary"
            onClick={() => {
              addToCart({
                productId: product._id,
                variantId: selectedVariant._id,
                quantity,
              });
              onClose();
              setCartDrawerOpen(true);
            }}
            disabled={maxQuantity === 0}
          >
            Xác nhận
          </Button>
        </div>
      </Drawer>

      <CartSide
        open={isCartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </>
  );
};

export default ModalAddToCart;
