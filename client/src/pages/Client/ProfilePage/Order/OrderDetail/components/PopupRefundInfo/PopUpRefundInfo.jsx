import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
} from "antd";
import React, { useState } from "react";
import {
  getAllBankInfo,
  updateRefundInfo,
} from "../../../../../../../services/OrderServices";
import styled from "styled-components";
import tw from "twin.macro";
import { toast } from "react-toastify";
import { useEffect } from "react";
const StyledSelect = styled(Select)`
  .ant-select-item-option-content {
    ${tw`whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px]`}
  }
  .ant-select-selection-item {
    ${tw`whitespace-nowrap overflow-hidden text-ellipsis max-w-[85%]`}
  }
`;
const { Option } = Select;

const PopUpRefundInfo = ({ orderId, children, info }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    if (info) {
      const foundBank = data.data.find(
        (item) => `${item.shortName} - ( ${item.name})` === info.bankName
      );
      form.setFieldsValue({
        ...info,
        bankName: foundBank._id,
      });
    }
    setIsModalOpen(true);
  };
  const { data } = useQuery({
    queryKey: ["BANK"],
    queryFn: getAllBankInfo,
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, body }) => {
      updateRefundInfo(id, body);
    },
  });
  const handleConfirm = async () => {
    if (!isPending) {
      try {
        await form.validateFields();
        const values = form.getFieldsValue();
        const foundBankInfo = data?.data?.find(
          (item) => item._id === values.bankName
        );
        const payload = {
          ...values,
          bankName: `${foundBankInfo.shortName} - ( ${foundBankInfo.name})`,
          bankLogo: foundBankInfo.logo,
        };
        mutate(
          { id: orderId, body: payload },
          {
            onSuccess: () => {
              toast.success("Cập nhật thông tin hoàn tiền thành công");
              setTimeout(() => {
                queryClient.invalidateQueries({
                  predicate: (query) => query.queryKey.includes("ORDERS"),
                });
              }, 100);
              setIsModalOpen(false);
            },
            onError: (err) => {
              toast.error("Có lỗi xảy ra vui lòng thử lại");
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children, { onClick: showModal })
        : children}
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title="Xác nhận thông tin hoàn tiền"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        destroyOnHidden
        footer={
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Popconfirm
              title="Xác nhận thông tin"
              description="Hãy chắc chắn đây là thông tin tài khoản mà bạn nhận hoàn tiền!"
              onConfirm={handleConfirm}
              okText="Chắc chắn"
              placement="bottomRight"
              cancelText="Không"
            >
              <Button disabled={isPending} type="primary">
                Xác nhận
              </Button>
            </Popconfirm>
            <Button onClick={() => setIsModalOpen(false)} danger>
              Huỷ bỏ
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Số tài khoản"
            name="accountNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số tài khoản",
              },
              {
                min: 5,
                message: "Số tài khoản phải có tối thiểu 5 ký tự",
              },
              {
                max: 20,
                message: "Số tài khoản chỉ được nhập tối đa 20 ký tự",
              },
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
              {
                min: 5,
                message: "Tên chủ tài khoản phải có tối thiểu 5 ký tự",
              },
              {
                max: 50,
                message: "Tên chủ tài khoản chỉ được nhập tối đa 50 ký tự",
              },
            ]}
          >
            <Input placeholder="VD: PHAM NGOC QUY" />
          </Form.Item>

          <Form.Item
            label="Ngân hàng"
            name="bankName"
            rules={[{ required: true, message: "Vui lòng chọn ngân hàng" }]}
          >
            <StyledSelect
              showSearch
              placeholder={"Chọn ngân hàng"}
              optionFilterProp="children"
              allowClear
              // onChange={(value, option) => {
              //   onChange?.({ name: value, id: option?.key });
              // }}
              filterOption={(input, option) =>
                option?.children
                  ?.toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {data?.data?.map((item) => (
                <Option key={item._id} value={item._id}>
                  <img tw="w-8" src={item.logo} alt="" /> {item.shortName} -{" "}
                  {item.name}
                </Option>
              ))}
            </StyledSelect>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PopUpRefundInfo;
