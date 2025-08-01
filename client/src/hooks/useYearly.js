import { useQuery } from "@tanstack/react-query";
import statsService from "../services/StatServices";

export const useYearlyStats = (year) =>
  useQuery({
    queryKey: ["YEAR_RANGE", year],
    queryFn: () => statsService.getTotalStatsByYearInput(year),
  });
