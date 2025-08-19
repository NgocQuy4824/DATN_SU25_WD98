import React from "react";
import { ShoppingBag } from "lucide-react";
import tw from "twin.macro";
import { useGetAllVouchers } from "../../../hooks/useVoucherHook";
import { useClaimVoucher } from "../../../hooks/useMyVoucherHook";

const VoucherCard = () => {
  const { data: response } = useGetAllVouchers();
  const vouchers = response?.data ?? [];

  const { mutate: claim } = useClaimVoucher();

  return (
    <div css={tw`flex overflow-x-auto space-x-5 p-5`}>
      {vouchers.map((voucher) => (
        <div
          key={voucher._id}
          css={tw`min-w-[300px] border-2 border-red-500 rounded-xl p-4 flex gap-4 items-start bg-red-50 shadow-sm`}
        >
          <div css={tw`bg-orange-500 rounded-md p-2 text-white`}>
            <ShoppingBag size={24} />
          </div>

          <div css={tw`flex-1 text-sm`}>
            <p>
              <span css={tw`font-semibold`}>Giảm trực tiếp </span>
              <span css={tw`text-red-600 font-bold`}>{voucher.discountValue.toLocaleString("vi-VN")} ₫</span>
              <span css={tw`font-semibold`}> cho đơn hàng</span>
            </p>

            <p css={tw`text-gray-500 mt-1 text-xs`}>
              Hiệu Lực:{" "}
              <span css={tw`font-medium`}>
                {new Date(voucher.startDate).toLocaleString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </span>{" "}
              <span css={tw`text-gray-400`}>đến</span>{" "}
              <span css={tw`font-medium`}>
                {new Date(voucher.endDate).toLocaleString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </span>
            </p>

            <p css={tw`text-red-500 font-semibold mt-2 cursor-pointer hover:underline`} onClick={() => claim(voucher.code)}>
              Nhận mã &gt;
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoucherCard;
