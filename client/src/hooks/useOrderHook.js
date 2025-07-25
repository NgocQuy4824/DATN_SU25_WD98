import { useQuery } from "@tanstack/react-query";
import { getMyOrder } from "../services/OrderServices";

export const useGetMyOrder = (query) => {
  return useQuery({
    queryKey: ["ORDERS", query],
    queryFn: () => getMyOrder(query),
    keepPreviousData: true,
  });
};
