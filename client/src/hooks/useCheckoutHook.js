import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/CheckoutServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createPaymentLinkAPI } from "../services/PayOsServices";

export const useCreateOrder = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["CREATE_ORDER"],
    mutationFn: (data) => createOrder(data),
    onSuccess: (data) => {
      toast.success("Đặt hàng thành công");
      navigate(`/order/success/${data.data._id}`);
    },
    onError: (err) => {
      const { response } = err;
      toast.error(response.data.message);
    },
  });
};

export const useCreateOrderPayos = () => {
  return useMutation({
    mutationKey: ["CREATE_PAYOS"],
    mutationFn: (body) => createPaymentLinkAPI(body),
    onSuccess: (data) => {
      window.location.href = data.data.checkoutUrl;
    },
    onError: (err) => {
      const { response } = err;
      toast.error(response.data.message);
    },
  });
};
