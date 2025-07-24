import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/CheckoutServices";
import { toast } from "react-toastify";

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: ["CREATE_ORDER"],
    mutationFn: (data) => createOrder(data),
    onSuccess: () => {
      toast.success("Đặt hàng thành công");
    },
    onError: (err) => {
      const { response } = err;
      toast.error(response.data.message);
    },
  });
};
