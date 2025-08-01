export const optionsBarChart = (timeline) => {
  return {
    colors: ["#66B2FF", "#FFD700"],
    chart: {
      fontFamily: '"Inter", sans-serif',
      type: "bar",
      height: 400,
      width: "100%",
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      background: "#F8FAFC",
      animations: {
        enabled: true,
        easing: 'easeout',
        speed: 300, // Giảm tốc độ animation chính xuống (300ms hoặc 400ms là tốt cho hover)
        animateGradually: {
          enabled: true,
          delay: 200,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 400, // Giữ nguyên hoặc điều chỉnh nếu bạn thấy nó vẫn ảnh hưởng
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
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
      categories: timeline || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#475569",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Số đơn hàng",
          style: {
            color: "#66B2FF",
            fontSize: "14px",
            fontWeight: 600,
          },
        },
        labels: {
          formatter(value) {
            return value != null ? value.toLocaleString() : "0";
          },
          style: {
            colors: "#475569",
            fontSize: "12px",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Doanh thu (VNĐ)",
          style: {
            color: "#FFD700",
          },
        },
        labels: {
          formatter(value) {
            if (value >= 1e9) return `${(value / 1e9).toFixed(1)} tỷ`;
            if (value >= 1e6) return `${(value / 1e6).toFixed(1)} triệu`;
            return `${value != null ? value.toLocaleString() : "0"} đ`;
          },
          style: {
            colors: "#475569",
            fontSize: "12px",
          },
        },
      },
    ],
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: "14px",
      markers: {
        size: 12,
        offsetX: -4,
      },
      itemMargin: {
        horizontal: 10,
      },
      labels: {
        colors: "#1E293B",
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontSize: "12px",
        fontFamily: '"Inter", sans-serif',
      },
      x: {
        show: true,
        format: "dd MMM yyyy",
      },
      y: {
        formatter(val, { seriesIndex }) {
          if (seriesIndex === 1) {
            if (val >= 1e9) return `${(val / 1e9).toFixed(1)} tỷ VNĐ`;
            if (val >= 1e6) return `${(val / 1e6).toFixed(1)} triệu VNĐ`;
            return `${val.toLocaleString()} VNĐ`;
          }
          return val.toLocaleString();
        },
      },
      marker: {
        show: true,
      },
      theme: "light",
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 3,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.03, // Tăng nhẹ giá trị filter để hiệu ứng rõ ràng hơn
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 300,
          },
          plotOptions: {
            bar: {
              columnWidth: "60%",
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },
        },
      },
    ],
  };
};