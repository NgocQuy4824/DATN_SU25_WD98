import React from "react";
import { Row, Col, Empty, Spin, Card, Breadcrumb } from "antd";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import { useMyCart } from "../../../hooks/useCartHook";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { data, isLoading } = useMyCart();

  if (isLoading) return <Spin tip="Đang tải giỏ hàng..." />;

  const items = data?.data?.items || [];

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/">Trang chủ</Link> },
          { title: "Giỏ hàng" },
        ]}
      />
      <Row gutter={16}>
        <Col flex="auto">
          <Card title="Danh sách giỏ hàng">
            {items.length > 0 ? (
              items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))
            ) : (
              <Empty description="Giỏ hàng trống" />
            )}
          </Card>
        </Col>
        <Col flex="300px">
          <CartSummary />
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
