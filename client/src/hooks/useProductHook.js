// hooks/useCreateProduct.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, deleteProduct, getAllProducts } from '../services/ProductServices.js';
import { toast } from 'react-toastify';

//hook xử lý lấy tất cả sản phẩm
export const useGetAllProducts = (onSuccessCallback) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000,//5p để refetch lại dữ liệu do thêm sp mới k nhận được ngay
    onSuccess: (data) => {
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error('Lấy danh sách sản phẩm thất bại');
      console.error(err);
    }
  });
};

//hook xử lý tạo sản phẩm
export const useCreateProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success('Tạo sản phẩm thành công');
      queryClient.invalidateQueries(['products']); 
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error('Tạo sản phẩm thất bại');
      console.error(err);
    }
  });
};

//hook xử lý xóa sản phẩm
export const useDeleteProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast.success('Xóa sản phẩm thành công');
      queryClient.invalidateQueries(['products']);
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error('Xóa sản phẩm thất bại');
      console.error(err);
    }
  });
};