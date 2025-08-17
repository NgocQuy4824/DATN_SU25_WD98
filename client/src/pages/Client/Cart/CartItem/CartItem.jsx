import React from "react";
import { Row, Col, Typography, Button, Checkbox, Alert } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import UpdateQuantity from "../UpdateQuantity/UpdateQuantity";
import {
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "../../../../hooks/useCartHook";
import useCartSelection from "../../../../hooks/useCartSelected";

const { Text } = Typography;

const ItemWrapper = styled.div`
  border-bottom: 1px solid #eee;
  padding: 12px 0;
`;

const ProductName = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const StyledCheckbox = styled(Checkbox)`
  &.ant-checkbox-wrapper .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1677ff;
    border-color: #1677ff;
  }
  &.ant-checkbox-wrapper .ant-checkbox-checked::after {
    border: 1px solid #1677ff;
  }
`;

const CartItem = ({ item }) => {
  const removeCartItemMutation = useRemoveCartItem();
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const {
    handleSelectItem,
    handleRemoveItem,
    handleUpdateQuantity,
    existsVariantId,
  } = useCartSelection();
  const handleRemove = () => {
    removeCartItemMutation.mutate(item.variantId,{onSuccess: (_,body)=>{
      handleRemoveItem(body)
    }});
  };

  const handleChangeQuantity = (newQuantity) => {
    updateQuantityMutation.mutate({
      productId: item.productId,
      variantId: item.variantId,
      quantity: newQuantity,
    });
    handleUpdateQuantity(item.variantId, newQuantity);
  };
  const handleToogleSelect = (e) => {
    if (e) {
      handleSelectItem(item);
    } else {
      handleRemoveItem(item.variantId);
    }
  };
  const isOutStock = item.variant ? !item.variant.countInStock : true;
  return (
    <ItemWrapper>
      <Row align="middle" gutter={12} wrap={false}>
        <Col flex="32px">
          <StyledCheckbox
            disabled={isOutStock}
            checked={existsVariantId?.includes(item.variantId)}
            onChange={(e) => handleToogleSelect(e.target.checked)}
          />
        </Col>
        <Col flex="70px">
          <Image src={item.variant?.image} alt={item.name} />
        </Col>
        <Col flex="auto">
          {isOutStock ? (
            <>
              <ProductName title={item.name}>{item.name}</ProductName>
              <Text type="danger">Sản phẩm đã hết hàng</Text>
            </>
          ) : (
            <>
              <ProductName title={item.name}>{item.name}</ProductName>
              <Text type="secondary">
                Màu sắc: <b>{item.variant?.color}</b>
              </Text>
              <br />
              <Text type="secondary">Kích cỡ: {item.variant?.size?.name}</Text>
              <br />
              <Text strong>{item.price?.toLocaleString()} ₫</Text>
            </>
          )}
          {item.warning && (
            <Alert
              message={item.warning}
              type="warning"
              showIcon
              style={{ marginTop: 8 }}
            />
          )}
        </Col>
        <Col flex="100px">
          {!isOutStock && (
            <UpdateQuantity
              value={item?.quantity}
              min={1}
              max={item.variant?.countInStock}
              onChange={handleChangeQuantity}
              loading={updateQuantityMutation.isLoading}
            />
          )}
        </Col>
        <Col flex="100px" style={{ textAlign: "right" }}>
          {!isOutStock && (
            <Text strong>
              {(item?.price * item?.quantity).toLocaleString()} ₫
            </Text>
          )}
        </Col>
        <Col flex="40px" style={{ textAlign: "center" }}>
          <Button
            type="link"
            onClick={handleRemove}
            danger
            icon={<DeleteOutlined />}
          />
        </Col>
      </Row>
    </ItemWrapper>
  );
};

export default CartItem;
