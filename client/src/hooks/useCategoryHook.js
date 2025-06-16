import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createCategory,
  getAllCategory,
  updateCategoryById,
} from "../services/CategoryServices";

export const useGetAllCategory = (onSuccessCallback) => {
  return useQuery({
    queryKey: ["typeproducts"],
    queryFn: getAllCategory,
    staleTime: 5 * 60 * 1000, //5p để refetch lại dữ liệu do thêm sp mới k nhận được ngay
    onSuccess: (data) => {
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error("Lấy danh sách danh mục thất bại");
      console.error(err);
    },
  });
};


export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData) => createCategory(categoryData),
    onSuccess: () => {
      toast.success("Tạo danh mục thành công");
      queryClient.invalidateQueries(["typeproducts"]);
    },
    onError: (err) => {
      toast.error("Tạo danh mục thất bại");
      console.error(err);
    },
  });
}

// Cập nhật danh mục
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) => updateCategoryById(id, updatedData),
    onSuccess: () => {
      toast.success("Cập nhật danh mục thành công");
      queryClient.invalidateQueries(["typeproducts"]);
    },
    onError: (err) => {
      toast.error("Cập nhật danh mục thất bại");
      console.error(err);
    },
  });
};
