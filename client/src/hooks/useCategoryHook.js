import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCategoryById, getAllCategory } from "../services/CategoryServices";


export const useGetAllCategory = (onSuccessCallback) => {
  return useQuery({
    queryKey: ['typeproducts'],
    queryFn: getAllCategory,
    staleTime: 5 * 60 * 1000,//5p để refetch lại dữ liệu do thêm sp mới k nhận được ngay
    onSuccess: (data) => {
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error('Lấy danh sách danh mục thất bại');
      console.error(err);
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: () => {
      toast.success("Xóa danh mục thành công");
      queryClient.invalidateQueries(['typeproducts']);
    },
    onError: (err) => {
      toast.error("Xóa danh mục thất bại");
      console.error(err);
    }
  });

};