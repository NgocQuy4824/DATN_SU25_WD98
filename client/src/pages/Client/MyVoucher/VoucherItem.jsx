import React from "react";
import { ShoppingBag } from "lucide-react";
import tw from "twin.macro";

const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString("vi-VN")} | ${date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const VoucherItem = ({ voucher, onUseNow }) => {


  return (
    <div css={tw`flex items-start gap-3 p-4 border border-gray-200 rounded-lg mb-3 bg-red-50`}>
      <div css={tw`flex-shrink-0`}>
        <div css={tw`w-14 h-14 flex items-center justify-center bg-orange-500 rounded-md text-white`}>
          <ShoppingBag size={20} />
        </div>
      </div>
      <div css={tw`flex-1`}>
        <p css={tw`text-sm text-black mb-1`}>
          {voucher.voucherId?.discountType === "fixed" ? (
            <>
              Giảm trực tiếp{" "}
              <span css={tw`text-red-500 font-semibold`}>
                {voucher.voucherId?.discountValue.toLocaleString("vi-VN")} ₫
              </span>{" "}
              cho đơn hàng
            </>
          ) : (
            <>
              Giảm{" "}
              <span css={tw`text-red-500 font-semibold`}>
                {voucher.voucherId?.discountValue}%
              </span>{" "}
              cho tổng giá trị đơn hàng
            </>
          )}
        </p>
        <p css={tw`text-xs text-gray-500 mb-2`}>
          Hiệu lực từ: {formatDateTime(voucher.voucherId?.startDate)}{" "}
          <span css={tw`text-black font-medium`}>Đến</span> {formatDateTime(voucher.voucherId?.endDate)}
        </p>
        <p
          css={tw`text-sm text-red-500 font-medium cursor-pointer`}
          onClick={() => onUseNow?.(voucher)}
        >
          Dùng ngay &gt;
        </p>
      </div>
    </div>
  );
};

export default VoucherItem;
