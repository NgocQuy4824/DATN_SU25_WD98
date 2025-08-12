import { Button, Modal, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useCancelOrder } from "../../../../../../../hooks/useOrderHook";

export default function PopUpCancelUser({ children, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("Sản phẩm hết hàng hoặc không khả dụng");
  const [ortherValue, setOrtherValue] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const { mutate, isPending } = useCancelOrder(id);
  const options = [
    {
      value: "Sản phẩm không giống mong muốn",
      label: "Sản phẩm không giống mong muốn",
    },
    {
      value: "Tôi muốn thay đổi thông tin nhận hàng",
      label: "Tôi muốn thay đổi thông tin nhận hàng",
    },
    {
      value: "orther",
      label: "Khác...",
    },
  ];
  const handleConfirm = () => {
    const description = value === "orther" ? ortherValue : value;
    const payload = {
      role: "user",
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
            <Button onClick={handleConfirm} type="primary">
              Xác nhận
            </Button>
            <Button onClick={() => setIsModalOpen(false)} danger>
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
