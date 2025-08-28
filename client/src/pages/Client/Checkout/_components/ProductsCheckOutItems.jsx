import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  Image,
  Typography,
  Space,
  Tag,
  Divider,
  Tooltip,
  Checkbox,
  Radio,
} from "antd";
import { Link } from "react-router-dom";
import { useMyCart } from "../../../../hooks/useCartHook";
import styled from "styled-components";
import tw from "twin.macro";
import { Card as AntCard, Button as AntButton } from "antd";
import {
  useCreateOrder,
  useCreateOrderPayos,
} from "../../../../hooks/useCheckoutHook";
import { toast } from "react-toastify";
import { removeVoucher } from "../../../../redux/slides/voucherSlice";
import { useQueryClient } from "@tanstack/react-query";

const { Text } = Typography;

// Styled components
const Card = styled(AntCard)`
  ${tw`shadow-lg border border-gray-200 rounded-xl`}
`;

const InnerCard = styled(AntCard)`
  ${tw`mt-4 border-blue-200 bg-blue-50`}
`;

const Button = styled(AntButton)`
  ${tw`h-[45px] text-lg font-semibold`}
`;

export default function ProductsCheckOutItems({ isShippingPage, form }) {
  const { items: cartItems } = useSelector((state) => state.cart);
  const selectedVoucher = useSelector((state) => state.voucher.selectedVoucher);
  const { data } = useMyCart();
  const checkoutInfo = useSelector((state) => state.checkout);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const createOrder = useCreateOrder();
  const createOrderPayOs = useCreateOrderPayos();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  // Gộp dữ liệu cart từ store và API
  const mergedCartItems = cartItems.map((cartItem) => {
    const fullItem = data?.data?.items.find(
      (p) => p.variantId === cartItem.variantId
    );
    if (!fullItem || !fullItem.price) {
      // Đánh dấu item đã xóa/ẩn
      return {
        ...cartItem,
        isDeleted: true,
        name: fullItem?.name || "Sản phẩm",
        variant: null,
        price: 0,
        discount: 0,
      };
    }
    return {
      ...fullItem,
      quantity: cartItem.quantity,
      isDeleted: false,
    };
  });

  // Tổng tiền chỉ tính item còn hợp lệ
  const totalPrice = mergedCartItems.reduce((acc, item) => {
    if (item.isDeleted) return acc;
    const priceAfterDiscount = item.price * (1 - (item.discount || 0) / 100);
    return acc + priceAfterDiscount * (item.quantity || 0);
  }, 0);

  const totalQuantity = mergedCartItems.reduce(
    (total, item) => (item.isDeleted ? total : total + (item.quantity || 0)),
    0
  );

  // Giảm giá từ voucher
  const discountAmount = selectedVoucher
    ? selectedVoucher.voucherId?.discountType === "fixed"
      ? selectedVoucher.voucherId.discountValue
      : Math.floor((selectedVoucher.voucherId.discountValue / 100) * totalPrice)
    : 0;

  // Tổng tiền cuối cùng sau giảm giá
  const totalAfterDiscount = Math.max(totalPrice - discountAmount, 0);

  const handleContinueShipping = () => {
    form
      .validateFields()
      .then(() => form.submit())
      .catch((err) => console.log("Form has errors", err));
  };

  const handleCreateOrder = () => {
    let invalidItem = false;
    const items = mergedCartItems.map((item) => {
      if (!item?.variant) {
        toast.error("Biến thể sản phẩm đã không còn, vui lòng thử lại");
        invalidItem = true;
        return null;
      }

      const finalPrice = item.price * (1 - (item.discount || 0) / 100);
      return {
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        price: finalPrice,
        image: item.variant?.image,
        quantity: item.quantity,
        size: item.variant?.size?.name,
        color: item.variant?.color,
      };
    });

    if (invalidItem) return;

    const payload = {
      ...checkoutInfo,
      items,
      totalPrice: totalAfterDiscount ?? 0,
      voucherId: selectedVoucher?.voucherId?._id || null,
    };

    const onSuccess = () => {
      dispatch(removeVoucher());
      queryClient.invalidateQueries(["my-vouchers"]);
    };

    if (paymentMethod === "cod" && !createOrder.isPending) {
      createOrder.mutate(payload, { onSuccess });
    } else if (paymentMethod === "online" && !createOrderPayOs.isPending) {
      createOrderPayOs.mutate(payload, { onSuccess });
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <Card title="Sản phẩm thanh toán">
      {/* Danh sách sản phẩm */}
      <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: 8 }}>
        <List
          itemLayout="horizontal"
          dataSource={mergedCartItems}
          renderItem={(item) => (
            <List.Item style={item.isDeleted ? { opacity: 1 } : {}}>
              <List.Item.Meta
                avatar={
                  <Image
                    width={60}
                    src={item.variant?.image}
                    preview={false}
                    style={{
                      filter: item.isDeleted ? "grayscale(100%)" : "none",
                    }}
                  />
                }
                title={
                  item.isDeleted ? (
                    <Text style={{ color: "red" }} strong>
                      (Sản phẩm đã xoá hoặc ẩn)
                    </Text>
                  ) : (
                    <Link to={`/products/${item.productId}`}>
                      <Text strong>{item.name}</Text>
                    </Link>
                  )
                }
                description={
                  !item.isDeleted && (
                    <>
                      <Space wrap>
                        {item.variant?.color && (
                          <Tag color="blue">Màu: {item.variant.color}</Tag>
                        )}
                        {item.variant?.size?.name && (
                          <Tag color="purple">
                            Size: {item.variant.size.name}
                          </Tag>
                        )}
                      </Space>
                      <div style={{ marginTop: 8 }}>
                        <Text>Đơn giá: {formatCurrency(item.price)}</Text>
                        <Text style={{ marginLeft: 16 }}>
                          Số lượng: {item.quantity}
                        </Text>
                      </div>
                    </>
                  )
                }
              />
              {!item.isDeleted && (
                <div style={{ marginTop: 8 }}>
                  <Text>
                    Đã chiết khấu:{" "}
                    <span style={{ color: "#40a9ff", fontWeight: "bold" }}>
                      {item.discount || 0}%
                    </span>
                  </Text>
                  <br />
                  <Text strong style={{ color: "red" }}>
                    {formatCurrency(
                      item.price *
                      (1 - (item.discount || 0) / 100) *
                      item.quantity
                    )}
                  </Text>
                </div>
              )}
            </List.Item>
          )}
        />
      </div>

      <Divider />

      {/* Chọn phương thức thanh toán */}
      {!isShippingPage && (
        <div tw="my-8">
          <Text strong style={{ fontSize: 14 }}>
            Phương thức thanh toán
          </Text>
          <div tw="mt-2">
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Radio value={"cod"}>Thanh toán khi nhận hàng</Radio>
              <Radio value={"online"}>Thanh toán Online</Radio>
            </Radio.Group>
          </div>
        </div>
      )}

      {!isShippingPage && <hr />}
      <div tw="flex justify-between mb-2">
        <Text>Số lượng:</Text>
        <Text>{totalQuantity} sản phẩm</Text>
      </div>

      {/* Hiển thị giảm giá nếu có */}
      {discountAmount > 0 && (
        <div style={{ color: "red", marginBottom: 8 }}>
          Giảm: {formatCurrency(discountAmount)}{" "}
          {selectedVoucher?.voucherId?.discountType === "percentage" &&
            `(${selectedVoucher?.voucherId?.discountValue}%)`}
        </div>
      )}

      <div tw="flex justify-between items-center mt-2">
        <Text strong style={{ fontSize: 16 }}>
          Tổng tiền:
        </Text>
        <Text strong style={{ fontSize: 18, color: "#ff4d4f" }}>
          {formatCurrency(totalAfterDiscount ?? 0)}
        </Text>
      </div>

      {!isShippingPage && <hr />}
      {!isShippingPage && (
        <div tw="my-8">
          <Checkbox
            checked={agreePolicy}
            onChange={(e) => setAgreePolicy(e.target.checked)}
          >
            Đồng ý với <span>điều khoản và chính sách</span>
          </Checkbox>
        </div>
      )}

      <InnerCard>
        <Tooltip
          title={
            !isShippingPage && !agreePolicy
              ? "Bạn cần đồng ý với điều khoản và chính sách để tiếp tục đặt hàng"
              : ""
          }
          color="blue"
        >
          <Button
            type="primary"
            size="large"
            block
            onClick={
              isShippingPage ? handleContinueShipping : handleCreateOrder
            }
            loading={createOrder.isPending || createOrderPayOs.isPending}
            disabled={!agreePolicy && !isShippingPage}
          >
            {isShippingPage ? "Tiếp tục" : "Đặt hàng"}
          </Button>
        </Tooltip>
      </InnerCard>
    </Card>
  );
}
