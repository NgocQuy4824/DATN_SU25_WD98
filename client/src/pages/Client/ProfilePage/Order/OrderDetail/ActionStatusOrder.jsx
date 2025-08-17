import { Button, Popconfirm, Tag } from "antd";
import React from "react";
import tw from "twin.macro";
import PopUpCancelUser from "./components/PopupCancel/PopUpCancel";
import {
  useCompleteOrder,
  useEndingRefund,
} from "../../../../../hooks/useOrderHook";
import PopUpRefundInfo from "./components/PopupRefundInfo/PopUpRefundInfo";

export default function ActionStatusOrderUser({ status, id, isRefundInfo }) {
  const { mutate, isPending } = useCompleteOrder(id);
  const handleCompleteOrder = () => {
    mutate({role: 'user'});
  };
  const endingRefund = useEndingRefund(id);
  const handleEndingRefund = () => {
    endingRefund.mutate({role: 'user'});
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
      return isRefundInfo.hadRefund ? (
        <div tw="flex gap-5 items-center">
          <Tag color="red">
            Đang đợi hoàn tiền chúng tôi sẽ hoàn tiền đến bạn trong vòng 1 - 3
            ngày
          </Tag>
        </div>
      ) : (
        <div tw="flex gap-5 items-center">
          <PopUpRefundInfo orderId={id}>
            <Button type="primary">Điền thông tin hoàn tiền</Button>
          </PopUpRefundInfo>
        </div>
      );
    case "refund":
      return (
        <div>
          <Popconfirm
            title="Xác nhận đã nhận được tiền"
            description={`Bạn chắc chắn đã nhận được tiền? Nếu có thắc mắc liên hệ: ${isRefundInfo.reportInfo}`}
            onConfirm={handleEndingRefund}
            // onCancel={cancel}
            placement="topLeft"
            okText="Chắc chắn"
            cancelText="Huỷ"
          >
            <Button loading={endingRefund.isPending} type="primary">Đã nhận được tiền</Button>
          </Popconfirm>
        </div>
      );
    default:
      return <div></div>;
  }
}
