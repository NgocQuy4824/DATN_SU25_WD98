import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";

const OrderCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div css={tw`flex flex-col items-center justify-center h-screen`}>
      <h1 css={tw`text-xl font-semibold text-red-500`}>
        ❌ Bạn đã hủy thanh toán
      </h1>
      <p css={tw`text-gray-500 mt-1 text-xs`}>
        Đang chuyển về trang chủ...
      </p>
    </div>
  );
};

export default OrderCancel;
