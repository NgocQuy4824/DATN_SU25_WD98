import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllVoucher,
    getDetailVoucher,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    generateVouchers
} from "../services/VoucherServices";
import { toast } from "react-toastify";

export const useGetAllVouchers = () => {
    return useQuery({
        queryKey: ['vouchers'],
        queryFn: getAllVoucher,
        staleTime: 0,
        onError: () => {
            toast.error("Lấy danh sách voucher thất bại");
        },
    });
};

export const useGetDetailVoucher = (id) => {
    return useQuery({
        queryKey: ['voucher-detail', id],
        queryFn: () => getDetailVoucher(id),
        enabled: !!id,
        onError: () => {
            toast.error("Không thể lấy thông tin voucher");
        },
    });
};

export const useCreateVoucher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createVoucher,
        onSuccess: () => {
            toast.success("Tạo voucher thành công");
            queryClient.invalidateQueries(['vouchers']);
        },
        onError: () => {
            toast.error("Tạo voucher thất bại");
        },
    });
};

export const useUpdateVoucher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updateData }) => updateVoucher(id, updateData),
        onSuccess: () => {
            toast.success("Cập nhật voucher thành công");
            queryClient.invalidateQueries(['vouchers']);
        },
        onError: () => {
            toast.error("Cập nhật voucher thất bại");
        },
    });
};

export const useDeleteVoucher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteVoucher,
        onSuccess: () => {
            toast.success("Xoá voucher thành công");
            queryClient.invalidateQueries(['vouchers']);
        },
        onError: () => {
            toast.error("Xoá voucher thất bại");
        },
    });
};

export const useGenerateVouchers = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: generateVouchers,
        onSuccess: () => {
            toast.success("Tạo mã voucher hàng loạt thành công");
            queryClient.invalidateQueries(['vouchers']);
        },
        onError: () => {
            toast.error("Tạo mã voucher hàng loạt thất bại");
        },
    });
};

