/** @jsxImportSource @emotion/react */
import React from "react";
import { Table } from "antd";
import { CarOutlined, DollarOutlined } from "@ant-design/icons";
import tw from "twin.macro";

const TabelOrderItems = ({ productsItems, totalPrice }) => {
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div css={tw`flex gap-3 items-center`}>
          <img
            src={record.image}
            alt={record.name}
            css={tw`w-[60px] h-[60px] object-cover rounded`}
          />
          <div>
            <div css={tw`font-medium`}>{record.name}</div>
            <div css={tw`text-sm text-gray-500`}>
              Size: {record.size} | Màu: {record.color}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} ₫`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (total) => `${total.toLocaleString()} ₫`,
    },
  ];

  const shippingFee = 0;

  return (
    <div css={tw`space-y-4`}>
      <Table columns={columns} dataSource={productsItems} pagination={false} />

      <div css={tw`flex gap-4`}>
        <div
          css={tw`flex-1 border rounded-xl bg-green-50 p-4 flex items-center justify-between shadow-sm`}
        >
          <div css={tw`flex items-center gap-2`}>
            <CarOutlined css={tw`text-green-600 text-xl`} />
            <span css={tw`text-sm font-semibold text-red-600`}>
              Cước phí vận chuyển
            </span>
          </div>
          <span css={tw`font-semibold text-lg`}>
            {shippingFee.toLocaleString()} ₫
          </span>
        </div>

        <div
          css={tw`flex-1 border rounded-xl bg-purple-50 p-4 flex items-center justify-between shadow-sm`}
        >
          <div css={tw`flex items-center gap-2`}>
            <DollarOutlined css={tw`text-purple-600 text-xl`} />
            <span css={tw`text-sm font-semibold text-red-600`}>Tổng tiền</span>
          </div>
          <span css={tw`font-semibold text-lg`}>
            {totalPrice.toLocaleString()} ₫
          </span>
        </div>
      </div>
    </div>
  );
};

export default TabelOrderItems;
