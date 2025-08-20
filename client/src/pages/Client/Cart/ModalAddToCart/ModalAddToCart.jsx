import React, { useState, useEffect } from 'react';
import { Drawer, Typography, Row, Col, Button, InputNumber } from 'antd';
import { useSizeOptions } from '../../../../hooks/useSizeOptions';
import { useAddToCart } from '../../../../hooks/useCartHook';
import CartSide from '../CartSide/CartSide';
const { Title, Text } = Typography;

const ModalAddToCart = ({
  open,
  onClose,
  product,
  variants,          // tất cả biến thể
  variant,           // biến thể ban đầu
  quantity: initialQuantity,
}) => {
  console.log({
  open,
  onClose,
  product,
  variants,          // tất cả biến thể
  variant,           // biến thể ban đầu
  quantity: initialQuantity,
})
  const [selectedVariant, setSelectedVariant] = useState(variant);
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  console.log("product",product)
  const { mutate: addToCart } = useAddToCart();

  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false)

  const { sizeMap } = useSizeOptions();
  console.log('sizeMap', sizeMap)
  useEffect(() => {
    if (variant) setSelectedVariant(variant);
    if (initialQuantity) setQuantity(initialQuantity);
  }, [variant, open, initialQuantity]);

  if (!variant || !variants) return null;

  // Lấy số lượng tồn kho hiện tại
  const maxQuantity = selectedVariant.countInStock || 0;

console.log('selectedVariant0', selectedVariant)

console.log(444, sizeMap[selectedVariant?.size])
// return (<>12</>)


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
              alt={product?.name}
              style={{ width: '100%', height: 300, objectFit: 'contain', borderRadius: 8 }}
            />
          </Col>
          <Col span={16}>
            <Title level={5}>{product?.name}</Title>
            <Text>
              Giá: {(product?.price * (1 - product?.discount / 100)).toLocaleString("vi-VN")} đ
            </Text>
            <br />
            <Text>Giảm giá: {product?.discount}%</Text>
            <br />
            <Text>Màu sắc: {selectedVariant?.color}</Text>
            <br />
            <Text>Kích thước: {sizeMap[selectedVariant?.size] || selectedVariant?.size.name}</Text>
            <br />
            <Text>
              Số lượng:
              <InputNumber
                min={1}
                max={maxQuantity}
                value={quantity}
                onChange={(value) => {
                  //nếu nhập lớn hơn tổn kho thì setValue = max tồn kho 
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
                  // Reset số lượng nếu biến thể mới tồn kho ít hơn
                  setQuantity(Math.min(quantity, v.countInStock || 1));
                }}
                style={{
                  border: v._id === selectedVariant?._id ? '2px solid #1677ff' : '1px solid #ccc',
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
