import { Button, Popconfirm } from "antd";
import React from "react";
import tw from "twin.macro";
import PopUpCancel from "./PopupCancel/PopUpCancel";
import { useUpdateStatusOrder } from "../../../../hooks/useOrderHook";

export default function ActionStatusOrder({ status, id }) {
  const { mutate, isPending } = useUpdateStatusOrder(id);
  const handleUpdateStatus = (value) => {
    const payload = {
      status: value,
    };
    mutate(payload);
  };
  switch (status) {
    case "pending":
      return (
        <div tw="flex gap-5 items-center">
          <Popconfirm
            title="Xác nhận đơn hàng"
            description="Bạn có muốn chuyển trạng thái đơn hàng sang thành xác nhận?"
            okText="Chắc chắn"
            cancelText="Không"
            onConfirm={() => handleUpdateStatus("confirmed")}
            placement="topRight"
            disabled={isPending}
          >
            <Button loading={isPending} type="primary">
              Xác nhận
            </Button>
          </Popconfirm>
          <PopUpCancel id={id}>
            <Button danger type="primary">
              Huỷ đơn hàng
            </Button>
          </PopUpCancel>
        </div>
      );
    case "confirmed":
      return (
        <div tw="flex gap-5 items-center">
          <Popconfirm
            title="Bắt đầu quá trình vận chuyển"
            description="Bạn có muốn chuyển trạng thái đơn hàng sang thành đang vận chuyển?"
            okText="Chắc chắn"
            onConfirm={() => handleUpdateStatus("shipping")}
            placement="topRight"
            // disabled={isPending}
          >
            <Button loading={isPending} type="primary">
              Bắt đầu quá trình vận chuyển
            </Button>
          </Popconfirm>
          <PopUpCancel id={id}>
            <Button danger type="primary">
              Huỷ đơn hàng
            </Button>
          </PopUpCancel>
        </div>
      );
    case "shipping":
      return (
        <div tw="flex gap-5 items-center">
          <Popconfirm
            title="Xác nhận đã giao hàng"
            description="Bạn có muốn chuyển trạng thái đơn hàng sang thành đang đã giao?"
            okText="Chắc chắn"
            cancelText="Không"
            onConfirm={() => handleUpdateStatus("delivered")}
            placement="topRight"
          >
            <Button loading={isPending} type="primary">
              Xác nhận đã giao
            </Button>
          </Popconfirm>
          <PopUpCancel id={id} isShipping={true}>
            <Button danger type="primary">
              Huỷ đơn hàng
            </Button>
          </PopUpCancel>
        </div>
      );
    default:
      return <div></div>;
  }
}
