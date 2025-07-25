import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import WrapperList from "../../../../../../components/common/WrapperList/index";
import { UseRangePicker } from "../../../../../../hooks/useRangePicker";
import DateRangePickerComponent from "../RangePicker/DateRangePickerComponent";
import { optionsBarChart } from "./_option";

const BarChartRangePicker = () => {
  const today = dayjs();
  const [dateRange, setDateRange] = useState([today, today]);

  const { data: dailyStats } = UseRangePicker(dateRange[0], dateRange[1]);

  
  const revenue = dailyStats?.data?.map((item) => item.totalRevenue) || [];
  console.log(revenue);
  const orders = dailyStats?.data?.map((item) => item.totalOrders) || [];
  const time = dailyStats?.data?.map((item) => item.date) || [];

  const series = [
    {
      name: "Đơn hàng",
      data: orders || [0],
    },
    {
      name: "Doanh thu",
      data: revenue || [0],
    },
  ];

  const handleDateRangeChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange(dates);
    } else {
      setDateRange([today, today]);
    }
  };

  useEffect(() => {
    if (!dateRange[0] || !dateRange[1]) {
      setDateRange([today, today]);
    }
  }, []);

  return (
    <WrapperList
      title="Đơn hàng và doanh thu"
      option={
        <DateRangePickerComponent
          onDateRangeChange={handleDateRangeChange}
          value={dateRange}
        />
      }
      lineButtonBox
    >
      <div>
        <div id="barChart">
          <ReactApexChart
            options={optionsBarChart(time)}
            series={series}
            type="bar"
            height={350}
            width="100%"
          />
        </div>
      </div>
    </WrapperList>
  );
};

export default BarChartRangePicker;
