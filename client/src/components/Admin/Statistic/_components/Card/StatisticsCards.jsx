import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";
import { useTotalStats } from "../../../../../hooks/useTotal";
import { Currency } from "../../../../../utils";
import DatePickerCard from "../DatePickerCard/DatePickerCard";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`mx-auto px-4 py-6 max-w-7xl`}
`;

const Header = styled.div`
  ${tw`mb-6 flex items-center justify-between`}
`;

const Title = styled.h2`
  ${tw`text-2xl font-bold text-gray-800 font-sans`}
`;

const Grid = styled.div`
  ${tw`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`}
`;

const Card = styled.div`
  ${tw`rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300`}
`;

const CardHeader = styled.div`
  ${tw`flex items-center justify-between`}
`;

const CardTitle = styled.p`
  ${tw`text-sm font-medium text-gray-600 font-sans`}
`;

const CardValue = styled.h3`
  ${tw`mt-1 text-xl font-semibold text-gray-900 font-sans`}
`;

const IconWrapper = styled.div`
  ${tw`rounded-full bg-white p-3 shadow-sm`}
`;

const CardFooter = styled.div`
  ${tw`mt-4`}
`;

const CardSubtitle = styled.p`
  ${tw`text-xs text-gray-500 font-sans`}
`;

const RateBadge = styled.span`
  ${tw`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium font-sans`}
  ${({ levelUp }) =>
    levelUp ? tw`bg-green-100 text-green-700` : tw`bg-red-100 text-red-700`}
`;

const LoadingContainer = styled.div`
  ${tw`flex h-screen items-center justify-center font-sans text-xl text-gray-600`}
`;

const ErrorContainer = styled.div`
  ${tw`flex h-screen items-center justify-center text-red-500 font-sans text-xl`}
`;

const StatisticsCards = () => {
  const [dateInput, setDateInput] = useState({
    type: "single",
    date: moment().format("YYYY-MM-DD"),
  });
  const { data, isLoading, error } = useTotalStats(dateInput);

  const handleDateChange = (newDateInput) => {
    setDateInput(newDateInput);
  };

  if (isLoading) return <LoadingContainer>Đang tải...</LoadingContainer>;
  if (error) return <ErrorContainer>Lỗi: {error.message}</ErrorContainer>;

  const statsData = data?.data || {};

  const cardData = [
    {
      title: "Tổng đơn hàng",
      total: statsData.totalOrders || 0,
      rate: `${(statsData.orderSuccessRate || 0).toFixed(2)}%`,
      levelUp: (statsData.orderSuccessRate || 0) > 50,
      levelDown: (statsData.orderSuccessRate || 0) <= 50,
      subtitle: `Thành công: ${statsData.successfulOrders || 0} | Đã hủy: ${
        statsData.cancelledOrders || 0
      }`,
      icon: (
        <ShoppingCartOutlined
          className="text-blue-500"
          style={{ fontSize: 28 }}
        />
      ),
      tooltip: "Tổng số đơn hàng được đặt trong khoảng thời gian đã chọn",
      rateTooltip: "Tỷ lệ thành công trong khoảng thời gian đã chọn",
    },
    {
      title: "Tổng doanh thu",
      total: Currency.format(statsData.totalRevenue || 0),
      rate: Currency.format(statsData.averageDailyRevenue || 0),
      subtitle: "Doanh thu trung bình",
      icon: (
        <DollarCircleOutlined
          className="text-green-500"
          style={{ fontSize: 28 }}
        />
      ),
      tooltip: "Tổng doanh thu trong khoảng thời gian đã chọn",
      rateTooltip:
        "Doanh thu trung bình hàng ngày trong khoảng thời gian đã chọn",
    },
    {
      title: "Người dùng mới",
      total: statsData.newUsers || 0,
      rate: `${(statsData.orderCancelRate || 0).toFixed(2)}%`,
      levelUp: (statsData.orderCancelRate || 0) < 30,
      levelDown: (statsData.orderCancelRate || 0) >= 30,
      subtitle: "Tỷ lệ hủy đơn",
      icon: (
        <UserOutlined className="text-purple-500" style={{ fontSize: 28 }} />
      ),
      tooltip: "Số lượng người dùng đăng ký mới trong khoảng thời gian đã chọn",
      rateTooltip: "Tỷ lệ hủy đơn trong khoảng thời gian đã chọn",
    },
    {
      title: "Sản phẩm mới",
      total: statsData.newProducts || 0,
      icon: (
        <ShoppingOutlined
          className="text-orange-500"
          style={{ fontSize: 28 }}
        />
      ),
      tooltip:
        "Số lượng sản phẩm mới được thêm vào trong khoảng thời gian đã chọn",
    },
  ];

  return (
    <Container>
      <Header>
        <Title>Thống kê bán hàng</Title>
        <DatePickerCard
          onDateChange={handleDateChange}
          initialDate={dateInput}
        />
      </Header>

      <Grid>
        {cardData.map((card, index) => (
          <Card key={index} bgColor={card.bgColor}>
            <CardHeader>
              <div>
                <CardTitle>{card.title}</CardTitle>
                <CardValue>{card.total}</CardValue>
              </div>
              <IconWrapper>{card.icon}</IconWrapper>
            </CardHeader>
            {card.subtitle && (
              <CardFooter>
                <CardSubtitle>{card.subtitle}</CardSubtitle>
                {card.rate && (
                  <RateBadge levelUp={card.levelUp}>{card.rate}</RateBadge>
                )}
              </CardFooter>
            )}
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default StatisticsCards;
