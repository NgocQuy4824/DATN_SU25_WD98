import { Button, Popconfirm, Tag } from "antd";
import React from "react";
import tw from "twin.macro";
import PopUpCancelUser from "./components/PopupCancel/PopUpCancel";
import { useCompleteOrder } from "../../../../../hooks/useOrderHook";
import PopUpRefundInfo from "./components/PopupRefundInfo/PopUpRefundInfo";

export default function ActionStatusOrderUser({ status, id, isRefundInfo }) {
  const { mutate, isPending } = useCompleteOrder(id);
  const handleCompleteOrder = () => {
    mutate();
  };
  switch (status) {
    case "pending":
      return (
        <div tw="flex gap-5 items-center">
          <PopUpCancelUser id={id}>
            <Button danger type="primary">
              Huỷ đơn hàng
            </Button>
          </PopUpCancelUser>
        </div>
      );
    case "delivered":
      return (
        <div tw="flex gap-5 items-center">
          <Button
            loading={isPending}
            onClick={handleCompleteOrder}
            type="primary"
          >
            Hoàn thành đơn hàng
          </Button>
        </div>
      );
    case "pendingCancelled":
      return isRefundInfo ? (
        <div tw="flex gap-5 items-center">
          <Tag color="red">Đang đợi hoàn tiền chúng tôi sẽ hoàn tiền đến bạn trong vòng 1 - 3 ngày</Tag>
        </div>
      ) : (
        <div tw="flex gap-5 items-center">
         <PopUpRefundInfo orderId={id}>
           <Button type="primary">Điền thông tin hoàn tiền</Button>
         </PopUpRefundInfo>
        </div>
      );
    default:
      return <div></div>;
  }
}
