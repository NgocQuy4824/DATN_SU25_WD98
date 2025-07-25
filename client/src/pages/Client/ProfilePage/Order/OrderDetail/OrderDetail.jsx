import React from "react";
import tw from "twin.macro";
import StatusOrder from "./StatusOrder";
import { Link, useParams } from "react-router-dom";
import ServicesInfo from "./ServicesInfo";
import CustomerInfo from "./CustomerInfo";
import TabelOrderItems from "./TabelOrderItems";
import { Spin } from "antd";
import { useGetDetailOrder } from "../../../../../hooks/useOrderHook";
import ActionStatusOrderUser from "./ActionStatusOrder";
import { translateRole } from "../../../../../components/Admin/Orders/OrderDetail/OrderDetail";
import { CloseCircleOutlined } from "@ant-design/icons";

const OrderDetailUser = () => {
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
    title: `${data?.address?.detail} - ${data?.address?.ward}, ${data?.address?.district}, ${data?.address?.province}, Việt Nam`,
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
  return (
    <div css={tw`pl-4`}>
      <Link to={"/profile/orders"}>Quay về danh sách</Link>
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
            <ActionStatusOrderUser status={data?.status} id={orderId} />
          </div>
          {data?.canceled.isCancel ? (
            <div tw="flex justify-center py-4 flex-col items-center gap-2">
              <CloseCircleOutlined tw="text-4xl mb-4 text-red-500" />
              <p tw="text-xl font-semibold text-red-500">
                Đơn hàng của bạn đã bị huỷ bởi{" "}
                {translateRole(data?.canceled.by)}
              </p>
              <p tw="text-lg text-red-700">{data?.canceled.description}</p>
            </div>
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
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetailUser;
