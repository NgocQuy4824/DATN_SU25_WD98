import React from "react";
import { Row, Col, Typography, Button, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import UpdateQuantity from "../UpdateQuantity/UpdateQuantity";

const { Text } = Typography;

const ItemWrapper = styled.div`
  border-bottom: 1px solid #eee;
  padding: 12px 0;
`;

const CartItem = ({ item, }) => {
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
          <UpdateQuantity value={item.quantity} min={1} onChange={newQuantity => { console.log("Update quantity:", item.id, newQuantity); }} />
        </Col>
        <Col>
          <Text strong>{(item.price * item.quantity).toLocaleString()} ₫</Text>
        </Col>
        <Col>
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Col>
      </Row>
    </ItemWrapper>
  );
};

export default CartItem;
