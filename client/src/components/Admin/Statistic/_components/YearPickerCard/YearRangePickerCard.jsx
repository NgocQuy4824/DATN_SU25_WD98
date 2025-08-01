import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useYearlyStats } from "../../../../../hooks/useYearly";
import WrapperList from "../../../../common/WrapperList/index";
import { optionYearChart } from "./_option";

const YearlyStats = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const { data: yearlyStats, refetch } = useYearlyStats(selectedYear);

  //   useEffect(() => {
  //     refetch();
  //   }, [selectedYear, refetch]);

  const onYearChange = (date) => {
    if (date) {
      const newYear = date.year();
      if (newYear <= dayjs().year()) {
        setSelectedYear(newYear);
      }
    }
  };
  console.log(selectedYear);
  const disabledDate = (current) => {
    return current.year() > dayjs().year();
  };

  const chartData = useMemo(
    () => optionYearChart(yearlyStats, selectedYear),
    [yearlyStats, selectedYear]
  );

  return (
    <WrapperList
      title="Đơn hàng và doanh thu theo năm"
      option={
        <DatePicker
          onChange={onYearChange}
          picker="year"
          defaultValue={dayjs().year(selectedYear)}
          disabledDate={disabledDate}
        />
      }
      lineButtonBox
    >
      <div>
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={450}
          />
        </div>
      </div>
    </WrapperList>
  );
};

export default YearlyStats;
