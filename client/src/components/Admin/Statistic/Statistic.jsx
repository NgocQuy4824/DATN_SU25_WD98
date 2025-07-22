import { PageContainer } from "@ant-design/pro-components";

import StatisticsCards from "./_components/Card/StatisticsCards";
import OrderStatusCards from "./_components/Card/OrderStatusCards";
import BarChartRangePicker from "./_components/Charts/BarChart/RangePicker";
import { TopProducts } from "./_components/TopProducts/TopProducts";
import TopUsers from "./_components/TopUsers/_component/TopUsers";

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
        <div className="mb-3 ml-3">
          <StatisticsCards />
          <OrderStatusCards />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
              <div className="rounded-lg bg-white p-4 shadow">
                <BarChartRangePicker />
              </div>
            </div>
            <div>
              <TopProducts />
            </div>
            <div className="mt-4">
              <TopUsers />
            </div>
      </>
    </>
  );
};

export default Statistic;
