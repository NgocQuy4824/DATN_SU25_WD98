import { Button, Card, ConfigProvider, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import DateRangePickerCard from "../../DatePickerCard/DateRangePickerCard";
import { columns } from "../_option";
import LatestOrders from "./LatestOrders";
import Title from "antd/es/typography/Title";

import styled from "styled-components";
import tw from "twin.macro";
import WrapperList from "../../../../../common/WrapperList";
import { useTopBuyers } from "../../../../../../hooks/useTopBuyers";

const LoadingErrorContainer = styled.div`
  ${tw`flex text-lg text-black/60 items-center justify-center`}
`;
const EmptyTable = styled.span`
  ${tw`text-sm text-black/60`}
`;

const StyledCard = styled(Card)`
  ${tw`mb-8`}
`;

const TopUsers = () => {
  const [dateInput, setDateInput] = useState({
    type: "range",
    start: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    end: dayjs().format("YYYY-MM-DD"),
  });

  const { data: topBuyersData, isLoading, error } = useTopBuyers(dateInput);

  if (isLoading)
    return <LoadingErrorContainer>Đang tải...</LoadingErrorContainer>;
  if (error)
    return (
      <LoadingErrorContainer css={tw`text-red-500`}>
        Error: {error.message}
      </LoadingErrorContainer>
    );

  const handleDateChange = (newDateInput) => {
    setDateInput(newDateInput);
  };

  const tableData = topBuyersData?.data.topBuyers.map((buyer, index) => ({
    ...buyer,
    key: buyer._id,
    index: index + 1,
  }));


  return (
    <WrapperList
      title="Thống kê khách hàng"
      lineButtonBox
      option={
        <DateRangePickerCard
          onDateChange={handleDateChange}
          initialDate={dateInput}
        />
      }
    >
      <StyledCard
        title={<Typography.Title level={4}>Đơn hàng gần đây</Typography.Title>}
        extra={
          <Button type="link">
            <Link to="/system/admin/orders">Xem tất cả</Link>
          </Button>
        }
      >
        {topBuyersData.latestOrders && (
          <LatestOrders orders={topBuyersData.latestOrders} />
        )}
      </StyledCard>

      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemHoverColor: "#1890ff",
              itemSelectedColor: "#1890ff",
              itemColor: "#595959",
              titleFontSize: 16,
            },
          },
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 4,
          },
        }}
      >
        {topBuyersData && topBuyersData.data.topBuyers && (
          <Card title={<Title level={4}>Top 5 khách hàng</Title>}>
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              locale={{ emptyText: <EmptyTable>Chưa có dữ liệu khả dụng</EmptyTable> }}
            />
          </Card>
        )}
      </ConfigProvider>
    </WrapperList>
  );
};

export default TopUsers;
