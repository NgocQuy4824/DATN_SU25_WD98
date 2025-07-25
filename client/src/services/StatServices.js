import dayjs from "dayjs";
import API from "../config/app";

const statsService = {
  async getOrderAndRevenueByRange(startDate, endDate) {
    if (!startDate || !endDate) {
      return { data: [] };
    }

    const { data } = await API.get("stats/dateRange", {
      params: {
        startDate: dayjs(startDate).format("DD-MM-YYYY"),
        endDate: dayjs(endDate).format("DD-MM-YYYY"),
      },
    });
    return data;
  },

  async getPendingTask() {
    const { data } = await API.get("stats/pending-task");
    return data;
  },

  async getTotalStatsByDateInput(dateInput) {
    let params = {};

    switch (dateInput.type) {
      case "single":
        params = {
          dateFilter: "single",
          startDate: dayjs(dateInput.date).format("DD-MM-YYYY"),
        };
        break;
      case "range":
        params = {
          dateFilter: "range",
          startDate: dayjs(dateInput.start).format("DD-MM-YYYY"),
          endDate: dayjs(dateInput.end).format("DD-MM-YYYY"),
        };
        break;
      case "monthly":
        params = {
          dateFilter: "monthly",
          month: dateInput.month,
          year: dateInput.year,
        };
        break;
      case "yearly":
        params = {
          dateFilter: "yearly",
          year: dateInput.year,
        };
        break;
      default:
        throw new Error("Loại dữ liệu thời gian không hợp lệ");
    }

    const { data } = await API.get("stats/total", { params });
    return data;
  },
};

export default statsService;
