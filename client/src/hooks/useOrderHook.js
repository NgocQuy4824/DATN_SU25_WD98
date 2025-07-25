import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelOrder,
  completeOrder,
  getAllOrder,
  getMyOrder,
  getOrderDetail,
  updateOrderStatus,
} from "../services/OrderServices";

export const useGetMyOrder = (query) => {
  return useQuery({
    queryKey: ["ORDERS", query],
    queryFn: () => getMyOrder(query),
    keepPreviousData: true,
  });
};

export const useGetAllOrders = (query) => {
  return useQuery({
    queryKey: ["ORDERS", "ALL", query],
    queryFn: () => getAllOrder(query),
    keepPreviousData: true,
  });
};

export const useGetDetailOrder = (id) => {
  return useQuery({
    queryKey: ["ORDERS", id],
    queryFn: () => getOrderDetail(id),
    enabled: !!id,
  });
};

export const useUpdateStatusOrder = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATESTATUS"],
    mutationFn: (body) => updateOrderStatus(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "ORDERS",
      });
    },
  });
};

export const useCompleteOrder = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATESTATUS"],
    mutationFn: () => completeOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "ORDERS",
      });
    },
  });
};

export const useCancelOrder = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATESTATUS"],
    mutationFn: (body) => cancelOrder(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "ORDERS",
      });
    },
  });
};
