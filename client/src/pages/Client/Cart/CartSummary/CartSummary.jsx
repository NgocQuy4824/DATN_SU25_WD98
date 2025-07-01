import React from "react";
import { Card, Typography, Button } from "antd";
import { useMyCart } from "../../../../hooks/useCartHook";

const { Text } = Typography;

const CartSummary = ({ totalItems = 0 }) => {
  const { data } = useMyCart();
  const items = data?.data?.items || [];

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

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
