import { Button, Form, Input, InputNumber, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useState } from "react";
import { useUpdateStatusOrder } from "../../../../../hooks/useOrderHook";

const PopUpConfirm = ({
  children,
  title,
  buttonConfirmText,
  buttonCancelText,
  status,
  isRefund,
  idOrder,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textValue, setValue] = useState("");
  const [form] = Form.useForm();
  const { mutate, isPending } = useUpdateStatusOrder(idOrder);
  const handleUpdateStatus = (value) => {
    const payload = {
      status: status,
      description: textValue,
    };
    mutate(payload);
  };
  const handleSubmitForm = async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children, { onClick: showModal })
        : children}
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title={title}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        afterClose={() => form.resetFields()}
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
              onClick={() =>
                isRefund ? handleSubmitForm() : handleUpdateStatus("status")
              }
              type="primary"
            >
              {buttonConfirmText || "Xác nhận"}
            </Button>
            <Button onClick={() => setIsModalOpen(false)} danger>
              {buttonCancelText || "Huỷ bỏ"}
            </Button>
          </div>
        }
      >
        {isRefund ? (
          <>
            <p tw="text-lg">Xác nhận đã hoàn tiền tới thông tin ngân hàng:</p>
            <Form form={form} layout="vertical">
              <Form.Item
                label="Số tài khoản"
                name="accountNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số tài khoản" },
                ]}
              >
                <Input placeholder="VD: 123456789" />
              </Form.Item>

              <Form.Item
                label="Chủ tài khoản"
                name="accountName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên chủ tài khoản",
                  },
                ]}
              >
                <Input placeholder="VD: Phạm Ngọc Quý" />
              </Form.Item>

              <Form.Item
                label="Ngân hàng"
                name="bankName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên ngân hàng" },
                ]}
              >
                <Input placeholder="VD: BIDV" />
              </Form.Item>
              <Form.Item
                label="Số tiền"
                name="amount"
                rules={[
                  { required: true, message: "Vui lòng nhập số tiền" },
                  {
                    validator(_, value) {
                      if (!value) return Promise.resolve();
                      if (value < 1000) {
                        return Promise.reject(
                          new Error("Số tiền tối thiểu là 1.000 VNĐ")
                        );
                      }
                      if (value > 100_000_000) {
                        return Promise.reject(
                          new Error("Số tiền tối đa là 100.000.000 VNĐ")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="VD: 200000000"
                  addonAfter="VND"
                  formatter={(value) =>
                    value
                      ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : ""
                  }
                  parser={(value) => value.replace(/\D/g, "")}
                />
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <p tw="text-lg">Mô tả cho lần cập nhật ( Không bắt buộc)</p>
            <TextArea
              onChange={(e) => setValue(e.target.value)}
              placeholder="Nhập mô tả"
            ></TextArea>
          </>
        )}
      </Modal>
    </>
  );
};

export default PopUpConfirm;
