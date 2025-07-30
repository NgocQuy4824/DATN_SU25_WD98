export const optionYearChart = (yearlyStats, selectedYear) => {
  const yearData = yearlyStats?.data || {
    year: selectedYear,
    totalOrders: 0,
    totalRevenue: 0,
  };
  const { year, totalOrders, totalRevenue } = yearData;

  const options = {
    chart: {
      type: "bar",
      height: 450,
      stacked: false,
      toolbar: {
        show: true,
      },
    },
    colors: ["#66B2FF", "#FFD700"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        borderRadius: 8,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#ffffff"],
    },
    xaxis: {
      categories: ["Đơn hàng và Doanh thu"],
    },
    yaxis: [
      {
        title: {
          text: "Đơn hàng",
          style: {
            color: "#66B2FF",
          },
        },
        labels: {
          formatter(value) {
            return value.toFixed(0);
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Doanh thu",
          style: {
            color: "#FFD700",
          },
        },
        labels: {
          formatter(value) {
            if (value >= 1e9) return `${(value / 1e9).toFixed(1)} tỷ`;
            if (value >= 1e6) return `${(value / 1e6).toFixed(1)} triệu`;
            return `${value.toLocaleString()} đ`;
          },
        },
      },
    ],
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  return {
    options,
    series: [
      {
        name: "Đơn hàng",
        type: "column",
        data: [totalOrders],
      },
      {
        name: "Doanh thu",
        type: "column",
        data: [totalRevenue],
      },
    ],
  };
};
