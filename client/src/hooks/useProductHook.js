// hooks/useCreateProduct.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getHighlightProducts,
  getProductDetail,
  getProductDetailSameSize,
  getProductsByFilter,
  hideProduct,
  showProduct,
  updateProduct,
} from "../services/ProductServices.js";
import { toast } from "react-toastify";

//hook xử lý lấy tất cả sản phẩm
export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 0,

    onError: (err) => {
      toast.error("Lấy danh sách sản phẩm thất bại");
      console.error(err);
    },
  });
};

//hook xử lý tạo sản phẩm
export const useCreateProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success("Tạo sản phẩm thành công");
      queryClient.invalidateQueries(["products"]);
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error("Tạo sản phẩm thất bại");
      console.error(err);
    },
  });
};

//hook xử lý xóa sản phẩm
export const useDeleteProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries(["products"]);
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error("Xóa sản phẩm thất bại");
      console.error(err);
    },
  });
};

export const useUpdateProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formDataWithId) => updateProduct(formDataWithId),
    onSuccess: (data) => {
      toast.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries(["products"]);
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error("Cập nhật sản phẩm thất bại");
      console.error(err);
    },
  });
};

export const useHideProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hideProduct,
    onSuccess: (data) => {
      toast.success("Ẩn sản phẩm thành công");
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["highlightProducts"]);
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error("Ẩn sản phẩm thất bại");
      console.error(err);
    },
  });
};

export const useShowProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: showProduct,
    onSuccess: (data) => {
      toast.success("Hiện sản phẩm thành công");
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["highlightProducts"]);
      onSuccessCallback?.(data);
    },
    onError: (err) => {
      toast.error("Hiện sản phẩm thất bại");
      console.error(err);
    },
  });
};
// lấy sản phẩm theo active: true
export const useHighlightProducts = () => {
  return useQuery({
    queryKey: ["highlightProducts"],
    queryFn: getHighlightProducts,
    onError: () => {
      toast.error("Lấy sản phẩm nổi bật thất bại");
    },
  });
};
/// lấy sản phẩm theo id
export const useProductDetail = (id) => {
  return useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => getProductDetail(id),
    enabled: !!id, // chỉ gọi khi có id
    onError: () => toast.error("Lấy chi tiết sản phẩm thất bại"),
  });
};

//lấy sản phẩm cùng size
export const useProductsSameSize = (sizeId, productId) => {
  return useQuery({
    queryKey: ["productsSameSize", sizeId, productId],
    queryFn: () => getProductDetailSameSize(sizeId, productId),
    enabled: !!sizeId && !!productId,
    onError: () => {
      toast.error("Lấy sản phẩm cùng size thất bại");
    },
  });
};

//filter màu , size
export const useProductsByFilter = (sizeId, color, categoryId) => {
  return useQuery({
    queryKey: ["productsByFilter", sizeId, color, categoryId],
    queryFn: () => getProductsByFilter({ sizeId, color, categoryId }),
    onError: () => {
      toast.error("Lấy sản phẩm theo bộ lọc thất bại");
    },
  });
};
