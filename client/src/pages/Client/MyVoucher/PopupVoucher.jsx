import React from "react";
import { Modal } from "antd";
import tw from "twin.macro";
import { useGetUserVouchers } from "../../../hooks/useMyVoucherHook";
import VoucherItem from "./VoucherItem";

const PopupVoucher = ({ open, onClose, onApplyVoucher, user }) => {
  const { data: response } = useGetUserVouchers();
  // Lọc voucher đã dùng
  const vouchers = (response?.data ?? []).filter(
    v => !user?.usedVouchers.includes(v.voucherId?._id)
  );

  const handleUseNow = (voucher) => {
    if (onApplyVoucher) {
      onApplyVoucher(voucher);
    }
  };

  return (
    <Modal
      title={<span css={tw`text-lg font-semibold`}>Danh Sách Voucher Của Bạn</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <div>
        {vouchers.length === 0 ? (
          <p css={tw`text-center text-gray-500 py-4`}>
            Bạn chưa có mã giảm giá nào còn hiệu lực hoặc đã dùng.
          </p>
        ) : (
          vouchers.map((voucher) => (
            <VoucherItem key={voucher._id} voucher={voucher} onUseNow={handleUseNow} />
          ))
        )}
      </div>
    </Modal>
  );
};

export default PopupVoucher;
