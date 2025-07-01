import React from "react";
import { Card, Typography, Button } from "antd";

const { Text } = Typography;

const CartSummary = ({ totalItems = [], totalPrice = [] }) => {
  return (
    <Card bordered style={{ border: "1px solid red" }}>
      <div style={{ marginBottom: 12 }}>
        <Text>Sản phẩm được chọn: </Text>
        <Text strong>{totalItems}</Text>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Text>Tổng tiền: </Text>
        <Text strong style={{ color: "green", fontSize: 18 }}>{totalPrice.toLocaleString()} ₫</Text>
      </div>
      <Text type="secondary">Phí vận chuyển sẽ được tính khi thanh toán.</Text>
      <div style={{ marginTop: 12 }}>
        <Button block type="primary">Thanh Toán</Button>
      </div>
    </Card>
  );
};

export default CartSummary;
