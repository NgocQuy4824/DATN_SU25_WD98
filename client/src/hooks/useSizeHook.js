import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createSize, getAllSizes, updateSizeById } from "../services/SizeServices";


export const useGetAllSizes = (onSuccessCallback) => {
    return useQuery({
        queryKey: ["sizes"],
        queryFn: getAllSizes,
        staleTime: 0, 
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
            queryClient.invalidateQueries(["sizes"]);
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
            queryClient.invalidateQueries(["sizes"]);
        },
        onError: (err) => {
            toast.error("Cập nhật kích thước thất bại");
            console.error(err);
        },
    });
};