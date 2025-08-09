import { Button, Modal, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useCancelOrder } from "../../../../../hooks/useOrderHook";

export default function PopUpCancel({ children, isShipping, id, isRefund }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ortherValue, setOrtherValue] = useState("");
  const { mutate, isPending } = useCancelOrder(id);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const options = !isShipping
    ? isRefund
      ? [
          {
            value: "Nghi ngờ spam hệ thống",
            label: "Nghi ngờ spam hệ thống",
          },
          {
            value: "Chưa nhận được tiền của người dùng thanh toán",
            label: "Chưa nhận được tiền của người dùng thanh toán",
          },
          {
            value: "orther",
            label: "Khác...",
          },
        ]
      : [
          {
            value: "Sản phẩm hết hàng hoặc không khả dụng",
            label: "Sản phẩm không khả dụng hoặc hết hàng",
          },
          { value: "Thanh toán thất bại", label: "Thanh toán thất bại" },
          {
            value: "Nghi ngờ spam hệ thống",
            label: "Nghi ngờ spam hệ thống",
          },
          {
            value: "orther",
            label: "Khác...",
          },
        ]
    : [
        {
          value: "Quá trình vận chuyển xảy ra vấn đề",
          label: "Quá trình vận chuyển xảy ra vấn đề",
        },
        {
          value: "Không liên lạc được người nhận",
          label: "Không liên lạc được người nhận",
        },
        {
          value: "orther",
          label: "Khác...",
        },
      ];
  const [value, setValue] = useState(options[0].value);

  const handleConfirm = () => {
    const description = value === "orther" ? ortherValue : value;
    const payload = {
      role: "admin",
      description,
    };
    mutate(payload, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };
  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children, { onClick: showModal })
        : children}
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title="Huỷ đơn hàng"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        footer={
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button loading={isPending} onClick={handleConfirm} type="primary">
              Xác nhận
            </Button>
            <Button
              loading={isPending}
              onClick={() => setIsModalOpen(false)}
              danger
            >
              Huỷ bỏ
            </Button>
          </div>
        }
      >
        <Radio.Group
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ display: "flex", flexDirection: "column", gap: 5 }}
          options={options}
        />
        <div style={{ marginTop: "15px" }}>
          {value === "orther" && (
            <TextArea
              onChange={(e) => setOrtherValue(e.target.value)}
              placeholder="Nhập lý do khác tại đây..."
            ></TextArea>
          )}
        </div>
      </Modal>
    </>
  );
}
