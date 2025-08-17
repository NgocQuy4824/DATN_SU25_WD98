import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  claimVoucher,
  getUserVouchers,
  updateVoucherQuantity,
} from "../services/MyVoucher";
import { toast } from "react-toastify";

// Lấy danh sách voucher đã nhận của người dùng
export const useGetUserVouchers = () => {
  return useQuery({
    queryKey: ['my-vouchers'],
    queryFn: getUserVouchers,
    staleTime: 0,
    onError: () => {
      toast.error("Lấy danh sách voucher của bạn thất bại");
    },
  });
};

// Nhận (claim) voucher
export const useClaimVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: claimVoucher,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Nhận voucher thành công");
        queryClient.invalidateQueries(['my-vouchers']);
      } else {
        toast.error(data.message || "Nhận voucher thất bại");
      }
    },
    onError: () => {
      toast.error("Nhận voucher thất bại");
    },
  });
};


// Cập nhật số lượng voucher sau khi sử dụng
export const useUpdateVoucherQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVoucherQuantity,
    onSuccess: (data) => {
      toast.success(data.message || "Cập nhật số lượng voucher thành công");
      queryClient.invalidateQueries(['my-vouchers']);
    },
    onError: () => {
      toast.error("Cập nhật số lượng voucher thất bại");
    },
  });
};
