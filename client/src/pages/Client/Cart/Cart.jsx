import React, { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Empty,
  Spin,
  Card,
  Breadcrumb,
  Checkbox,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import {
  useMyCart,
  useRemoveAllCart,
  useUpdateCartItemQuantity,
} from "../../../hooks/useCartHook";
import useCartSelection from "../../../hooks/useCartSelected";
import { useDispatch } from "react-redux";
import { removeAllCartItems } from "../../../redux/slides/cartSlice";

const CartPage = () => {
  const { data, isLoading } = useMyCart();
  const removeAllCartMutation = useRemoveAllCart();
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const [hasInitialSelected, setHasInitialSelected] = useState(false);
  const dispatch = useDispatch();
  const { cartItems, toogleSelectAll, handleRemoveItem, handleUpdateQuantity } =
    useCartSelection();

  const items = data?.data?.items || [];

  const filteredItems = useMemo(
    () =>
      items.filter((item) => item.variant && item.variant?.countInStock > 0),
    [items]
  );

  const isAllSelected = useMemo(() => {
    return (
      cartItems?.length > 0 &&
      filteredItems.every((item) =>
        cartItems.some((c) => c.variantId === item.variantId)
      )
    );
  }, [filteredItems, cartItems]);

  useEffect(() => {
    if (!hasInitialSelected && filteredItems.length > 0) {
      toogleSelectAll(filteredItems);
      setHasInitialSelected(true);
    }
  }, [filteredItems, hasInitialSelected]);

  useEffect(() => {
    filteredItems.forEach((item) => {
      const stock = item.variant?.countInStock ?? 0;
      if (item.quantity > stock && stock >= 0) {
        updateQuantityMutation.mutate({
          productId: item.productId,
          variantId: item.variantId,
          quantity: stock,
        });
      }
    });
  }, [
    filteredItems
      .map((i) => `${i.variantId}-${i.quantity}-${i.variant?.countInStock}`)
      .join(","),
  ]);

  useEffect(() => {
    cartItems?.forEach((cartItem) => {
      const item = items.find((i) => i.variantId === cartItem.variantId);
      if (!item) return;

      const stock = item.variant?.countInStock ?? 0;

      if (stock <= 0) {
        handleRemoveItem(cartItem.variantId);
      } else if (cartItem.quantity > stock) {
        handleUpdateQuantity(cartItem.variantId, stock);
      }
    });
  }, [items, cartItems]);
  useEffect(() => {
    if (!isLoading && items.length === 0) {
      dispatch(removeAllCartItems());
    }
  }, [isLoading, items, dispatch]);

  const handleRemoveSelected = () => {
    if (cartItems.length) removeAllCartMutation.mutate();
  };

  const handleToogleAllItems = (checked) => {
    toogleSelectAll(checked ? filteredItems : []);
  };

  if (isLoading) return <Spin tip="Đang tải giỏ hàng..." />;

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
            extra={
              !!filteredItems.length && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Checkbox
                    checked={isAllSelected}
                    disabled={!filteredItems.length}
                    onChange={(e) => handleToogleAllItems(e.target.checked)}
                  >
                    Chọn tất cả
                  </Checkbox>
                  <Button
                    danger
                    disabled={!cartItems?.length}
                    loading={removeAllCartMutation.isLoading}
                    onClick={handleRemoveSelected}
                  >
                    Xoá tất cả sản phẩm
                  </Button>
                </div>
              )
            }
          >
            {items.length > 0 ? (
              items?.map((item) => (
                <CartItem key={item.variantId} item={item} />
              ))
            ) : (
              <Empty description="Giỏ hàng trống" />
            )}
          </Card>
        </Col>

        <Col flex="300px">
          <CartSummary items={filteredItems} />
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
