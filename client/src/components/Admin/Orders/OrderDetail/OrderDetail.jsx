import React from "react";
import tw from "twin.macro";
import StatusOrder from "./StatusOrder";
import { useParams } from "react-router-dom";
import ServicesInfo from "./ServicesInfo";
import CustomerInfo from "./CustomerInfo";
import TabelOrderItems from "./TabelOrderItems";
import { useGetDetailOrder } from "../../../../hooks/useOrderHook";
import { Spin } from "antd";
import ActionStatusOrder from "./ActionStatusOrder";
import { CloseCircleOutlined } from "@ant-design/icons";
import RefundStatus from "./RefundStatus";

export const translateRole = (role) => {
  switch (role) {
    case "user":
      return "Người dùng";
    case "admin":
      return "Quản trị viên";
    case "system":
      return "Hệ thống";
    default:
      break;
  }
};
const OrderDetail = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetDetailOrder(orderId);
  const servicesInfo = {
    isPaid: data?.isPaid,
    paymentMethod: data?.paymentMethod,
    totalProduct: data?.items?.reduce((sum, item) => sum + item.quantity, 0),
    note: data?.note,
  };
  const customerData = {
    nameLabel: "Tên khách hàng",
    name: data?.customerInfo.name,
    email: data?.customerInfo.email,
    phone: data?.customerInfo.phone,
  };

  const receiverData = {
    nameLabel: "Tên người nhận",
    name: data?.receiverInfo.name,
    email: data?.receiverInfo.email,
    phone: data?.receiverInfo.phone,
  };

  const addressData = {
    title: `${data?.address?.detail} - ${data?.address?.ward}, ${data?.address?.province}, Việt Nam`,
  };
  const productItems = data?.items.map((item, index) => {
    return {
      key: index,
      image: item.image,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
      color: item.color,
      size: item.size,
      name: item.name,
      price: item.price,
    };
  });
  const totalPrice = data?.totalPrice;
  const orderLog = data?.orderLog || null;
  const pendingRefund = ["pendingCancelled", "refund"];
  return (
    <div css={tw`pl-4`}>
      {isLoading ? (
        <div tw="min-h-[70vh] flex items-center justify-center">
          <Spin size="large" spinning />
        </div>
      ) : (
        <>
          <div tw={"flex items-center justify-between"}>
            <h2 css={tw`text-lg text-blue-800 py-12`}>
              Thông tin đơn hàng #{orderId}
            </h2>
            <ActionStatusOrder status={data?.status} id={orderId} />
          </div>
          {data?.canceled.isCancel ? (
            <div tw="flex justify-center py-4 flex-col items-center gap-2">
              <CloseCircleOutlined tw="text-4xl mb-4 text-red-500" />
              <p tw="text-xl font-semibold text-red-500">
                Đơn hàng đã bị huỷ bởi {translateRole(data?.canceled.by)}
              </p>
              <p tw="text-lg text-red-700">{data?.canceled.description}</p>
            </div>
          ) : pendingRefund.includes(data?.status) ? (
            <RefundStatus currentStatus={data?.status} id={orderId} />
          ) : (
            <StatusOrder currentStatus={data?.status} />
          )}
          <br />
          <div>
            <ServicesInfo services={servicesInfo} />
            <CustomerInfo
              addressData={addressData}
              receiverData={receiverData}
              customerData={customerData}
            />
            <TabelOrderItems
              productsItems={productItems}
              totalPrice={totalPrice}
              orderStatusLog={orderLog}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
