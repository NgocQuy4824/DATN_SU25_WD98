import React from "react";
import { Row, Col, Typography, Button, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import UpdateQuantity from "../UpdateQuantity/UpdateQuantity";
import { useRemoveCartItem, useUpdateCartItemQuantity } from "../../../../hooks/useCartHook";

const { Text } = Typography;

const ItemWrapper = styled.div`
  border-bottom: 1px solid #eee;
  padding: 12px 0;
`;

const CartItem = ({ item, }) => {

  const removeCartItemMutation = useRemoveCartItem();
  const updateQuantityMutation = useUpdateCartItemQuantity();

  const handleRemove = () => {
    removeCartItemMutation.mutate(item.variantId);
  };

  const handleChangeQuantity = (newQuantity) => {
    updateQuantityMutation.mutate({
      productId: item.productId,
      variantId: item.variantId,
      quantity: newQuantity,
    });
  };


  return (
    <ItemWrapper>
      <Row align="middle" gutter={16}>
        <Col>
          <Checkbox checked={item.selected} />
        </Col>
        <Col>
          <img src={item.variant.image} alt="" style={{ width: 60, height: 60, objectFit: "cover" }} />
        </Col>
        <Col flex="auto">
          <div><strong>{item.name}</strong></div>
          <Text type="secondary">Màu Sắc: <b>{item.variant.color}</b></Text><br />
          <Text type="secondary">Kích Cỡ: {item.variant.size.name}</Text><br />
          <Text strong>{item.price.toLocaleString()} ₫</Text>
        </Col>
        <Col>
          <UpdateQuantity value={item.quantity} min={1} max={item.variant.countInStock} onChange={handleChangeQuantity} loading={updateQuantityMutation.isLoading} />
        </Col>
        <Col>
          <Text strong>{(item.price * item.quantity).toLocaleString()} ₫</Text>
        </Col>
        <Col>
          <Button type="link" onClick={handleRemove} danger icon={<DeleteOutlined />} />
        </Col>
      </Row>
    </ItemWrapper>
  );
};

export default CartItem;
