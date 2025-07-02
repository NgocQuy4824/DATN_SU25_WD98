import React from "react";
import { Row, Col, Empty, Spin, Card, Breadcrumb, Checkbox, Button } from "antd";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import { useMyCart, useRemoveAllCart } from "../../../hooks/useCartHook";
import useCartSelection from "../../../hooks/useCartSelected";


const CartPage = () => {
  const { data, isLoading } = useMyCart();
  const removeAllCartMutation = useRemoveAllCart();

  const items = data?.data?.items || [];

  const { selectedItems, isAllSelected, toggleSelectAll, clearSelection } = useCartSelection(items);

  if (isLoading) return <Spin tip="Đang tải giỏ hàng..." />;

  const handleRemoveSelected = () => {
    if (selectedItems.length === 0)
      return;
    removeAllCartMutation.mutate();
    clearSelection();
  };

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
          <Card
            title="Danh sách giỏ hàng"
            extra={items.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Checkbox
                  checked={isAllSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                >
                  Chọn tất cả
                </Checkbox>
                <Button
                  danger
                  disabled={selectedItems.length === 0}
                  loading={removeAllCartMutation.isLoading}
                  onClick={handleRemoveSelected}
                >
                  Xoá sản phẩm đã chọn
                </Button>
              </div>
            )}
          >
            {items.length > 0 ? (
              items.map(item => (
                <CartItem key={item.variantId} item={{ ...item, selected: selectedItems.includes(item.variantId) }} />
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
