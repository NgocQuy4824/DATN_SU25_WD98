import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createSize, getAllSizes, updateSizeById } from "../services/SizeServices";


export const useGetAllSizes = (onSuccessCallback) => {
    return useQuery({
        queryKey: ["sizes"],
        queryFn: getAllSizes,
        staleTime: 5 * 60 * 1000, //5p để refetch lại dữ liệu do thêm sp mới k nhận được ngay
        onSuccess: (data) => {
            onSuccessCallback?.(data);
        },
        onError: (err) => {
            toast.error("Lấy danh sách kích thước thất bại");
            console.error(err);
        },
    });
};


export const useCreateSize = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sizeData) => createSize(sizeData),
        onSuccess: () => {
            toast.success("Tạo kích thước thành công");
            queryClient.invalidateQueries(["size"]);
        },
        onError: (err) => {
            toast.error("Tạo kích thước thất bại");
            console.error(err);
        },
    });
}

export const useUpdateSize = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updatedData }) => updateSizeById(id, updatedData),
        onSuccess: () => {
            toast.success("Cập nhật kích thước thành công");
            queryClient.invalidateQueries(["size"]);
        },
        onError: (err) => {
            toast.error("Cập nhật kích thước thất bại");
            console.error(err);
        },
    });
};