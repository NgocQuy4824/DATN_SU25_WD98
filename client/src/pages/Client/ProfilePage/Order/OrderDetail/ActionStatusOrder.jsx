import { Button, Popconfirm } from "antd";
import React from "react";
import tw from "twin.macro";
import { useCompleteOrder } from "../../../../../hooks/useOrderHook";
import PopUpCancelUser from "./PopupCancel/PopUpCancel";

export default function ActionStatusOrderUser({ status, id }) {
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
    default:
      return <div></div>;
  }
}
