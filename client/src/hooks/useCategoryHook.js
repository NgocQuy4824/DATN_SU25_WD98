import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getAllCategory } from "../services/CategoryServices";


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