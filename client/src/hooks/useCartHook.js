import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addToCart, getMyCart, removeAllCart, removeCartItem, updateCartItemQuantity } from "../services/CartServices";

export const useMyCart = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: getMyCart,
    onError: () => {
      toast.error("Lấy giỏ hàng thất bại");
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Thêm vào giỏ hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      toast.error("Thêm vào giỏ hàng thất bại");
    },
  });
};

export const useRemoveAllCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAllCart,
    onSuccess: () => {
      toast.success("Đã xoá toàn bộ giỏ hàng");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      toast.error("Xoá giỏ hàng thất bại");
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      toast.success("Đã xoá sản phẩm khỏi giỏ");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      toast.error("Xoá sản phẩm khỏi giỏ thất bại");
    },
  });
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      toast.error("Cập nhật số lượng thất bại");
    },
  });
};