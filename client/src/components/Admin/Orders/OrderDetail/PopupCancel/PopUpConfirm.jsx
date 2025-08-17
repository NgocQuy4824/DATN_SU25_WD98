import { Button, Form, Input, InputNumber, Modal, Space, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useState } from "react";
import { useUpdateStatusOrder } from "../../../../../hooks/useOrderHook";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmRefund } from "../../../../../services/OrderServices";
import { toast } from "react-toastify";

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
  const [fileList, setFileList] = useState([]);
  const [textValue, setValue] = useState("");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateStatusOrder(idOrder);
  const { mutate: confirmMutate, isPending: confirmIsPending } = useMutation({
    mutationFn: async ({ orderId, body }) => await confirmRefund(orderId, body),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Cập nhật hoàn tiền thành công");
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes("ORDERS"),
        });
      }, 200);
      form.resetFields();
      setFileList([]);
    },
  });
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
      const formData = new FormData();
      formData.append("accountNumber", values.accountNumber);
      formData.append("accountName", values.accountName);
      formData.append("bankName", values.bankName);
      formData.append("reportInfo", values.reportInfo);
      formData.append('desription', values.textValue)
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        if (file) {
          formData.append("image", file);
        }
      }

      confirmMutate({ orderId: idOrder, body: formData });
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
    if (isRefund) {
      form.setFieldsValue(isRefund);
    }
  };
  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children, { onClick: showModal })
        : children}
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title={title}
        width={"50vw"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        afterClose={() => {
          form.resetFields();
          setFileList([]);
        }}
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
              loading={isPending || confirmIsPending}
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
            <Form form={form} layout="vertical">
              <div
                style={{ alignItems: "flex-start", gap: 20, display: "flex" }}
              >
                <div style={{ width: "100%" }}>
                  <h3>Thông tin khách hàng</h3>
                  <Form.Item
                    label="Số tài khoản"
                    name="accountNumber"
                    rules={[
                      { required: true, message: "Vui lòng nhập số tài khoản" },
                    ]}
                  >
                    <Input placeholder="VD: 123456789" disabled />
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
                    <Input placeholder="VD: Phạm Ngọc Quý" disabled />
                  </Form.Item>

                  <Form.Item
                    label="Ngân hàng"
                    name="bankName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên ngân hàng",
                      },
                    ]}
                  >
                    <Input placeholder="VD: BIDV" disabled />
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
                      disabled
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
                </div>
                <div style={{ width: "100%" }}>
                  <h3>Xác nhận hoàn tiền</h3>
                  <Form.Item
                    label="Thông tin hỗ trợ"
                    name="reportInfo"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thông tin hỗ trợ",
                      },
                      {
                        pattern: /^0\d{8,11}$/,
                        message:
                          "Số điện thoại không hợp lệ (phải từ 9 đến 12 số và bắt đầu bằng 0)",
                      },
                    ]}
                  >
                    <Input placeholder="VD: 0383144530" />
                  </Form.Item>
                  <Form.Item
                    label="Ảnh xác minh hoàn tiền"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList || []}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ảnh xác minh hoàn tiền",
                      },
                    ]}
                  >
                    <Upload
                      listType="picture-card"
                      maxCount={1}
                      accept="image/*"
                      beforeUpload={() => false}
                      fileList={fileList}
                      onChange={({ fileList }) => setFileList(fileList)}
                      showUploadList={{ showPreviewIcon: true }}
                      onPreview={(file) => {
                        const src =
                          file.url || (file.response && file.response.url);
                        const image = new Image();
                        image.src = src;
                        const imgWindow = window.open(src);
                        if (imgWindow) {
                          imgWindow.document.write(image.outerHTML);
                        }
                      }}
                    >
                      {fileList.length >= 1 ? null : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    label="Mô tả cập nhật (Tuỳ chọn)"
                    name="updateDescription"
                  >
                    <TextArea
                     onChange={(e) => setValue(e.target.value)}
                      placeholder="Nhập mô tả cập nhật"
                    />
                  </Form.Item>
                </div>
              </div>
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
