import { Button, Form, Input, Modal, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import {
  useCancelOrder,
  useCancelRefund,
} from "../../../../../hooks/useOrderHook";

export default function PopUpCancel({ children, isShipping, id, isRefund }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ortherValue, setOrtherValue] = useState("");
  const { mutate, isPending } = useCancelOrder(id);
  const cancelRefund = useCancelRefund(id);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const options = !isShipping
    ? isRefund
      ? [
          { value: "Nghi ngờ spam hệ thống", label: "Nghi ngờ spam hệ thống" },
          {
            value: "Chưa nhận được tiền của người dùng thanh toán",
            label: "Chưa nhận được tiền của người dùng thanh toán",
          },
          { value: "orther", label: "Khác..." },
        ]
      : [
          {
            value: "Sản phẩm hết hàng hoặc không khả dụng",
            label: "Sản phẩm không khả dụng hoặc hết hàng",
          },
          { value: "Thanh toán thất bại", label: "Thanh toán thất bại" },
          { value: "Nghi ngờ spam hệ thống", label: "Nghi ngờ spam hệ thống" },
          { value: "orther", label: "Khác..." },
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
        { value: "orther", label: "Khác..." },
      ];

  const [value, setValue] = useState(options[0].value);

  const handleConfirm = async () => {
    try {
      const formValues = await form.validateFields(); // validate form
      const description = value === "orther" ? ortherValue : value;

      const payload = isRefund
        ? {
            role: "admin",
            description,
            reportInfo: formValues.reportInfo,
          }
        : {
            role: "admin",
            description,
          };

      if (!isRefund) {
        mutate(payload, {
          onSuccess: () => {
            setIsModalOpen(false);
            form.resetFields();
          },
        });
      }
      if (isRefund) {
        cancelRefund.mutate(payload, {
          onSuccess: () => {
            setIsModalOpen(false);
            form.resetFields();
          },
        });
      }
    } catch (error) {
      // nếu lỗi validate thì không submit
      console.log("Validate failed:", error);
    }
  };

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children, { onClick: showModal })
        : children}
      <Modal
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        title="Huỷ đơn hàng"
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
            <Button
              loading={isPending || cancelRefund.isPending}
              onClick={handleConfirm}
              type="primary"
            >
              Xác nhận
            </Button>
            <Button
              loading={isPending || cancelRefund.isPending}
              onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
              }}
              danger
            >
              Huỷ bỏ
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
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
              />
            )}
          </div>

          {isRefund && (
            <Form.Item
              label="Thông tin hỗ trợ"
              name="reportInfo"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin hỗ trợ" },
                {
                  pattern: /^0\d{8,11}$/,
                  message:
                    "Số điện thoại không hợp lệ (phải từ 9 đến 12 số và bắt đầu bằng 0)",
                },
              ]}
            >
              <Input placeholder="VD: 0383144530" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
}
