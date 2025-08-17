import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelOrder,
  cancelRefund,
  completeOrder,
  endingRefund,
  getAllOrder,
  getMyDetailOrder,
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

export const useGetMyDetailOrder = (id) => {
  return useQuery({
    queryKey: ["ORDERS", "MY-ORDER", id],
    queryFn: () => getMyDetailOrder(id),
  });
};

export const useUpdateStatusOrder = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATESTATUS"],
    mutationFn: (body) => updateOrderStatus(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "ORDERS",
        });
      }, 200);
    },
  });
};

export const useCompleteOrder = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATESTATUS"],
    mutationFn: (body) => {
      return completeOrder(id,body)
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "ORDERS",
        });
      }, 200);
    },
  });
};

export const useCancelOrder = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATESTATUS"],
    mutationFn: (body) => cancelOrder(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "ORDERS",
        });
      }, 200);
    },
  });
};

export const useCancelRefund = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CANCEL_REFUND"],
    mutationFn: (body) => cancelRefund(id, body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "ORDERS",
        });
      }, 200);
    },
  });
};

export const useEndingRefund = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["ENDING_REFUND"],
    mutationFn: (body) => endingRefund(id,body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "ORDERS",
        });
      }, 200);
    },
  });
};
