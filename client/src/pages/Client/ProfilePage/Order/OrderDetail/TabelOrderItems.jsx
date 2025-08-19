/** @jsxImportSource @emotion/react */
import React from "react";
import { Table, Tag } from "antd";
import {
  CameraOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  HistoryOutlined,
  StarFilled,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import tw from "twin.macro";
import dayjs from "dayjs";
import { translateRole } from "../../../../../components/Admin/Orders/OrderDetail/OrderDetail";

const TabelOrderItems = ({ productsItems, totalPrice, orderStatusLog }) => {
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
  const steps = [
    {
      title: "Chờ xác nhận",
      key: "pending",
      icon: <CameraOutlined tw="text-2xl text-blue-500" />,
    },
    {
      title: "Đã xác nhận",
      key: "confirmed",
      icon: <CheckCircleOutlined tw="text-2xl text-blue-500" />,
    },
    {
      title: "Đang giao",
      key: "shipping",
      icon: <TruckOutlined tw="text-2xl text-blue-500" />,
    },
    {
      title: "Đã giao hàng",
      key: "delivered",
      icon: <UserOutlined tw="text-2xl text-blue-500" />,
    },
    {
      title: "Hoàn thành",
      key: "done",
      icon: <StarFilled tw="text-2xl text-blue-500" />,
    },
    {
      title: "Đã huỷ",
      key: "cancelled",
      icon: <CloseCircleOutlined tw="text-2xl text-red-500" />,
    },
    {
      title: "Chờ hoàn tiền",
      key: "pendingCancelled",
      icon: <ClockCircleOutlined tw="text-2xl text-red-500" />,
    },
    {
      title: "Đã hoàn tiền",
      key: "refund",
      icon: <CheckCircleOutlined tw="text-2xl text-green-500" />,
    },
     {
      title: "Cập nhật",
      key: "updateRefund",
      icon: <HistoryOutlined tw="text-2xl text-green-500" />,
    },
  ];
  return (
    <div css={tw``}>
      <Table columns={columns} dataSource={productsItems} pagination={false} />

      <div css={tw`flex mt-8 mb-12 gap-4`}>
        <div
          css={tw`flex-1 border rounded-xl bg-green-50 p-4 flex items-center justify-between shadow-sm`}
        >
          <div css={tw`flex items-center gap-2`}>
            <CarOutlined css={tw`text-green-600 text-xl`} />
            <span css={tw`text-sm font-semibold text-red-600`}>
              Cước phí vận chuyển ( Miễn Phí ) 
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
      {orderStatusLog && (
        <div tw=" px-4 pb-16">
          <h3 tw="text-lg  font-semibold flex items-center gap-3">
            <HistoryOutlined tw="text-red-500" /> Lịch sử trạng thái
          </h3>
          <div tw="px-8 mt-20 flex flex-col gap-12">
            {orderStatusLog?.map((item, index) => {
              const matchedStep = steps.find(
                (step) => step.key === item.status
              );
              return (
                <div
                  key={index}
                  tw=" shadow-md py-4 px-8 grid grid-cols-[1fr, 7fr] items-center rounded-md"
                >
                  <div tw="flex flex-col gap-4 justify-center h-full items-center">
                    {matchedStep?.icon}
                    <p tw="text-sm font-semibold">
                      {matchedStep?.title || "Không xác định trạng thái"}
                    </p>
                  </div>
                  <div>
                    <div tw="flex flex-col justify-between">
                      <div tw="flex items-center justify-between pr-4">
                        <p tw="text-xs text-[#777777]">
                          Ngày cập nhật:{" "}
                          {dayjs(item?.updateDate)
                            .locale("vi-VN")
                            .format("DD-MM-YYYY | hh:mm")}
                        </p>
                        <p tw="text-xs">
                          Cập nhật bởi:{" "}
                          <span tw="font-semibold">
                            {item?.updateBy?.name || "Chưa cập nhật"}
                          </span>{" "}
                          - Vai trò:{" "}
                          <span tw="font-semibold">
                            {translateRole(item?.updateBy?.role) ||
                              "Chưa cập nhật"}
                          </span>
                        </p>
                      </div>
                      <Tag
                        color={
                          item?.status === "cancelled" ||
                          item?.status === "pendingCancelled"
                            ? "red"
                            : item?.status === "refund"
                            ? "green"
                            : "blue"
                        }
                        tw="py-4"
                      >
                        {item?.description || "Không có mô tả"}
                      </Tag>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelOrderItems;
