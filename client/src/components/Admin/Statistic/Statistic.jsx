import styled from "styled-components";
import tw from "twin.macro";

import StatisticsCards from "./_components/Card/StatisticsCards";
import OrderStatusCards from "./_components/Card/OrderStatusCards";
import BarChartRangePicker from "./_components/Charts/BarChart/RangePicker";
import { TopProducts } from "./_components/TopProducts/TopProducts";
import TopUsers from "./_components/TopUsers/_component/TopUsers";
import YearlyStats from "./_components/YearPickerCard/YearRangePickerCard";

const StatisticWrapper = styled.div`
  ${tw`mb-3 ml-3`}
`;

const ChartsGrid = styled.div`
  ${tw`grid grid-cols-1 gap-10`}
`;

const ChartCard = styled.div`
  ${tw`rounded-lg bg-white p-4 shadow`}
`;

const TopUsersContainer = styled.div`
  ${tw`mt-4`}
`;

const Statistic = () => {
  return (
    <>
      {/* <PageContainer
        className="site-page-header"
        title="Quản lý thống kê"
        content={
        }
      /> */}
      <>
      <TopUsersContainer>
            <TopUsers />
          </TopUsersContainer>
        <StatisticWrapper>
          <StatisticsCards />
          <OrderStatusCards />
        </StatisticWrapper>
        <ChartsGrid>
          <ChartCard>
            <BarChartRangePicker />
          </ChartCard>
          <div>
            <YearlyStats />
          </div>
          <div>
            <TopProducts />
          </div>
        </ChartsGrid>
      </>
    </>
  );
};

export default Statistic;
