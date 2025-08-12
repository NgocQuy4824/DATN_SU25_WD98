import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Spin, Tooltip } from "antd";
import { Link, useParams } from "react-router-dom";
import tw from "twin.macro";
import { translateRole } from "../../../../../components/Admin/Orders/OrderDetail/OrderDetail";
import RefundStatus from "../../../../../components/Admin/Orders/OrderDetail/RefundStatus";
import { useGetMyDetailOrder } from "../../../../../hooks/useOrderHook";
import ActionStatusOrderUser from "./ActionStatusOrder";
import CustomerInfo from "./CustomerInfo";
import ServicesInfo from "./ServicesInfo";
import StatusOrder from "./StatusOrder";
import TabelOrderItems from "./TabelOrderItems";
import PopUpRefundInfo from "./components/PopupRefundInfo/PopUpRefundInfo";

const OrderDetailUser = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetMyDetailOrder(orderId);
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
            <ActionStatusOrderUser
              status={data?.status}
              isRefundInfo={!!data?.refund}
              id={orderId}
            />
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
            {data?.refund?.accountNumber && (
              <div tw="px-4 my-4 mb-12">
                <div tw="flex items-center justify-between">
                  <h3 tw="text-lg font-semibold m-0">Thông tin hoàn tiền</h3>
                  {data.status === "pendingCancelled" && (
                    <PopUpRefundInfo orderId={data?._id} info={data?.refund}>
                      <Button danger>Cập nhật lại</Button>
                    </PopUpRefundInfo>
                  )}
                </div>
                <div tw="mt-8 justify-between px-4 py-8 shadow-md flex items-center rounded-lg">
                  <Tooltip title={data?.refund.bankName} placement="topLeft">
                    <p tw="text-base m-0 line-clamp-1 w-[30%]">
                      <img tw="w-32" src={data?.refund.bankLogo} alt="" />{" "}
                      {data?.refund.bankName}
                    </p>
                  </Tooltip>
                  <div tw="flex flex-col gap-3">
                    <p tw="text-[#777777] m-0">Chủ tài khoản:</p>
                    <p tw="m-0 font-semibold">{data?.refund.accountName}</p>
                  </div>
                  <div tw="flex flex-col gap-3">
                    <p tw="text-[#777777] m-0">Số tài khoản:</p>
                    <p tw="m-0 font-semibold">{data?.refund.accountNumber}</p>
                  </div>
                </div>
              </div>
            )}
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

export default OrderDetailUser;
