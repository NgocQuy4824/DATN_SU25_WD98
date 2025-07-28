import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { useCreateOrder } from "../../../../hooks/useCheckoutHook";
import { toast } from "react-toastify";

const { Text } = Typography;

// Tailwind-compatible Card và Button
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
  const { data } = useMyCart();
  const checkoutInfo = useSelector((state) => state.checkout);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const createOrder = useCreateOrder();

  const mergedCartItems = cartItems.map((cartItem) => {
    const fullItem = data?.data?.items.find(
      (p) => p.variantId === cartItem.variantId
    );
    return {
      ...fullItem,
      quantity: cartItem.quantity,
    };
  });

  const totalPrice = mergedCartItems.reduce((total, item) => {
    const price = item?.price || 0;
    const quantity = item?.quantity || 0;
    return total + price * quantity;
  }, 0);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleContinueShipping = () => {
    form
      .validateFields()
      .then(() => form.submit())
      .catch((err) => console.log("Form has errors", err));
  };

  const handleCreateOrder = () => {
    let mergedItems = false;
    const items = mergedCartItems.map((item) => {
      if (!item.variant) {
        toast.error("Biến thể của sản phẩm đã không còn vui lòng thử lại");
        mergedItems = true;
        return;
      }
      return {
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        price: item.price,
        image: item.variant?.image,
        quantity: item.quantity,
        size: item.variant?.size.name,
        color: item.variant?.color,
      };
    });
    if (mergedItems) {
      return;
    }
    const payload = {
      ...checkoutInfo,
      items,
      totalPrice: totalPrice,
    };
    if (paymentMethod === "cod" && !createOrder.isPending) {
      createOrder.mutate(payload);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  return (
    <Card title="Sản phẩm thanh toán">
      <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: 8 }}>
        <List
          itemLayout="horizontal"
          dataSource={mergedCartItems}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image width={60} src={item.variant?.image} preview={false} />
                }
                title={
                  <Link to={`/products/${item.productId}`}>
                    <Text strong>{item.name}</Text>
                  </Link>
                }
                description={
                  <>
                    <Space wrap>
                      {item.variant?.color && (
                        <Tag color="blue">Màu: {item.variant.color}</Tag>
                      )}
                      {item.variant?.size?.name && (
                        <Tag color="purple">Size: {item.variant.size.name}</Tag>
                      )}
                    </Space>
                    <div style={{ marginTop: 8 }}>
                      <Text>Đơn giá: {formatCurrency(item.price)}</Text>
                      <Text style={{ marginLeft: 16 }}>
                        Số lượng: {item.quantity}
                      </Text>
                    </div>
                  </>
                }
              />
              <div>
                <Text strong>{formatCurrency(item.price * item.quantity)}</Text>
              </div>
            </List.Item>
          )}
        />
      </div>

      <Divider />
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
              <Radio value={"online"}>Thanh toán qua VNPAY</Radio>
            </Radio.Group>
          </div>
        </div>
      )}

      {!isShippingPage && <hr />}
      <div tw="flex justify-between mb-2">
        <Text>Số lượng:</Text>
        <Text>{totalQuantity} sản phẩm</Text>
      </div>

      <div tw="flex justify-between items-center mt-2">
        <Text strong style={{ fontSize: 16 }}>
          Tổng tiền:
        </Text>
        <Text strong style={{ fontSize: 18, color: "#ff4d4f" }}>
          {formatCurrency(totalPrice)}
        </Text>
      </div>

      {!isShippingPage && <hr />}
      {!isShippingPage && (
        <>
          <div tw="my-8">
            <Checkbox
              value={agreePolicy}
              onChange={(e) => setAgreePolicy(e.target.checked)}
            >
              Đồng ý với <span>điều khoản và chính sách</span>
            </Checkbox>
          </div>
        </>
      )}
      <InnerCard>
        <Tooltip
          title={
            !isShippingPage && !agreePolicy
              ? "Bạn cần đồng ý với điều khoản và chính sách của chúng tôi để tiếp tục đặt hàng"
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
            disabled={!agreePolicy && !isShippingPage}
          >
            {isShippingPage ? "Tiếp tục" : "Đặt hàng"}
          </Button>
        </Tooltip>
      </InnerCard>
    </Card>
  );
}
