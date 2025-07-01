import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addToCart, getMyCart } from "../services/CartServices";

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