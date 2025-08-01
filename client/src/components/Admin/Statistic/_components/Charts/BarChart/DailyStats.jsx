import { DatePicker } from "antd";
import ReactApexChart from "react-apexcharts";
import WrapperList from "~/components/_common/WrapperList";
import { optionsBarChart } from "./_option";

// Hàm fake data thay cho useDailyStats
const getFakeDailyStats = () => {
  const startDate = new Date();
  const stats = [];

  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() - i);
    const formattedDate = currentDate.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD

    stats.push({
      date: formattedDate,
      totalOrders: Math.floor(Math.random() * 100) + 50, // Số đơn hàng ngẫu nhiên từ 50-149
      totalRevenue: Math.floor(Math.random() * 5000000) + 1000000, // Doanh thu ngẫu nhiên từ 1M-6M
    });
  }

  return { data: stats };
};

const DailyStats = () => {
  const { data: dailyStats } = getFakeDailyStats();


  const revenue = dailyStats?.map((item) => item.totalRevenue);
  const orders = dailyStats?.map((item) => item.totalOrders);
  const time = dailyStats?.map((item) => item.date);

  const series = [
    {
      name: "Orders",
      data: orders || [0],
    },
    {
      name: "Revenue",
      data: revenue || [0],
    },
  ];

  const onChange = (date, dateString) => {
    console.log(date, dateString); // Placeholder, có thể thêm logic sau
  };

  return (
    <WrapperList
      title="Daily Statistics"
      option={<DatePicker onChange={onChange} picker="month" />}
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

export default DailyStats;
