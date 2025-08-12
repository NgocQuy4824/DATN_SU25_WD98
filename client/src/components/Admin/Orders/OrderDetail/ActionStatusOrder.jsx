import { Button, Popconfirm, Tag } from "antd";
import React from "react";
import tw from "twin.macro";
import PopUpCancel from "./PopupCancel/PopUpCancel";
import { useUpdateStatusOrder } from "../../../../hooks/useOrderHook";
import PopUpConfirm from "./PopupCancel/PopUpConfirm";

export default function ActionStatusOrder({ status, id, isRefundInfo }) {
  switch (status) {
    case "pending":
      return (
        <div tw="flex gap-5 items-center">
          <PopUpConfirm
            title="Xác nhận đơn hàng"
            status={"confirmed"}
            idOrder={id}
          >
            <Button type="primary">Xác nhận</Button>
          </PopUpConfirm>
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
          <PopUpConfirm
            title="Bắt đầu quá trình vận chuyển"
            status={"shipping"}
            idOrder={id}
          >
            <Button type="primary">Bắt đầu quá trình vận chuyển</Button>
          </PopUpConfirm>
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
          <PopUpConfirm
            title="Xác nhận đã giao hàng"
            status={"delivered"}
            idOrder={id}
          >
            <Button type="primary">Xác nhận đã giao</Button>
          </PopUpConfirm>
          <PopUpCancel id={id} isShipping={true}>
            <Button danger type="primary">
              Huỷ đơn hàng
            </Button>
          </PopUpCancel>
        </div>
      );
    case "pendingCancelled":
      return isRefundInfo ? (
        <div tw="flex gap-5 items-center">
          <PopUpConfirm
            isRefund
            title="Xác nhận đã hoàn tiền"
            status="delivered"
            idOrder={id}
          >
            <Button type="primary">Xác nhận đã hoàn tiền</Button>
          </PopUpConfirm>

          <PopUpCancel id={id} isRefund>
            <Button danger type="primary">
              Từ chối hoàn tiền
            </Button>
          </PopUpCancel>
        </div>
      ) : (
        <div tw="flex gap-5 items-center">
          <Tag color="red">Đang đợi người dùng điền thông tin hoàn tiền</Tag>
        </div>
      );

    default:
      return <div></div>;
  }
}
