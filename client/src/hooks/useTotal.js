import { useQuery } from "@tanstack/react-query";
import statsService from "../services/StatServices";

export const useTotalStats = (dateInput) => {
  return useQuery({
    queryKey: ["TOTAL_STARTS", dateInput],
    queryFn: () => statsService.getTotalStatsByDateInput(dateInput),
  });
};
