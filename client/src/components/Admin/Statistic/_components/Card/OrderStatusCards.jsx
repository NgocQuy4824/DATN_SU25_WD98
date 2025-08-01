import React from "react";
import { Tooltip } from "antd";
import {
  ClockCircleOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import tw from "twin.macro";
import { useGetPendingTask } from "../../../../../hooks/useGetPendingTask";

const Container = styled.div`
  ${tw`container mx-auto px-4 py-6`}
`;

const Title = styled.h2`
  ${tw`mb-6 text-2xl font-bold text-gray-800`}
`;

const Grid = styled.div`
  ${tw`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`}
`;

const Card = styled.div`
  ${tw`transform cursor-pointer rounded-xl border bg-white border-gray-100 p-6 shadow-lg transition-all duration-300`}
`;

const CardContent = styled.div`
  ${tw`flex items-center justify-between`}
`;

const CardTitle = styled.p`
  ${tw`text-sm font-medium text-gray-600`}
`;

const CardCount = styled.h3`
  ${tw`mt-1 text-lg font-semibold text-gray-900`}
`;

const IconWrapper = styled.div`
  ${tw`rounded-full bg-white p-3 shadow-sm`}
`;

const Loading = styled.div`
  ${tw`container mx-auto px-4 py-6 text-xl text-center`}
`;

const ErrorText = styled.div`
  ${tw`container mx-auto px-4 py-6 text-xl text-center text-red-500`}
`;

const OrderStatusCards = () => {
  const { data, isLoading, error } = useGetPendingTask();

  if (isLoading) {
    return <Loading>Đang tải...</Loading>;
  }

  if (error || !data || !data.data) {
    return <ErrorText>Lỗi: {error?.message || "Không có dữ liệu"}</ErrorText>;
  }

  console.log(data);

  const orderStatuses = [
    {
      title: "Chờ Xác Nhận",
      count: data?.data?.pendingOrders || 0,
      icon: <ClockCircleOutlined className="text-blue-600"  style={{ fontSize: 28 }}  />,
      tooltip: "Đơn hàng đang chờ xác nhận từ cửa hàng",
    },
    {
      title: "Chờ Lấy Hàng",
      count: data?.data?.confirmedOrders || 0,
      icon: <ShoppingCartOutlined className="text-yellow-600"  style={{ fontSize: 28 }} />,
      tooltip: "Đơn hàng đã xác nhận, đang chờ lấy hàng",
    },
    {
      title: "Đã Xuất Lý",
      count: data?.data?.shippingOrders || 0,
      icon: <TruckOutlined className="text-green-600"  style={{ fontSize: 28 }} />,
      tooltip: "Đơn hàng đã được xuất lý và đang giao",
    },
    {
      title: "Đơn Hủy",
      count: data?.data?.cancelledOrders || 0,
      icon: <CloseCircleOutlined className="text-red-600"  style={{ fontSize: 28 }} />,
      tooltip: "Đơn hàng đã bị hủy",
    },
    {
      title: "Sản Phẩm Hết Hàng",
      count: data?.data?.outOfStockProducts || 0,
      icon: <ShoppingCartOutlined className="text-gray-600"  style={{ fontSize: 28 }} />,
      tooltip: "Sản phẩm trong đơn hàng đã hết hàng",
    },
  ];

  return (
    <Container>
      <Title>Danh sách các việc cần làm</Title>
      <Grid>
        {orderStatuses.map((status, index) => (
          <Tooltip key={index} title={status.tooltip}>
            <Card bgColor={status.bgColor}>
              <CardContent>
                <div>
                  <CardTitle>{status.title}</CardTitle>
                  <CardCount>{status.count}</CardCount>
                </div>
                <IconWrapper>{status.icon}</IconWrapper>
              </CardContent>
            </Card>
          </Tooltip>
        ))}
      </Grid>
    </Container>
  );
};

export default OrderStatusCards;
