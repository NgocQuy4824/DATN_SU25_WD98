import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import statsService from "../services/StatServices";

export const useTopBuyers = (dateInput) => {
  return useQuery({
    queryKey: ["TOP_5_BUYER", dateInput],
    queryFn: async () => {
      let dateFilter;
      let startDate;
      let endDate;
      let month;
      let year;

      switch (dateInput.type) {
        case "range":
          dateFilter = "range";
          startDate = dayjs(dateInput.start);
          endDate = dayjs(dateInput.end);
          break;
        case "monthly":
          dateFilter = "monthly";
          month = dateInput.month;
          year = dateInput.year;
          break;
        case "yearly":
          dateFilter = "yearly";
          year = dateInput.year;
          break;
        default:
          throw new Error("Kiểu đầu vào không hợp lệ");
      }

      return statsService.getTopBuyers(
        dateFilter,
        startDate,
        endDate,
        month,
        year
      );
    },
  });
};
