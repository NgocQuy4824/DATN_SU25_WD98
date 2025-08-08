import { createSelector } from "@reduxjs/toolkit";

// Tính toán toàn bộ giá trị giỏ hàng
export const selectCartTotals = createSelector(
  [
    (state) => state.cart.items, 
    (state) => state.voucher.selectedVoucher
  ],
  (cartItems, selectedVoucher) => {
    // Tổng tiền chưa giảm
    const totalPrice = cartItems.reduce((acc, item) => {
      const price = item?.price || 0;
      const quantity = item?.quantity || 0;
      return acc + price * quantity;
    }, 0);

    // Số tiền giảm
    let discountAmount = 0;
    if (selectedVoucher) {
      if (selectedVoucher.voucherId?.discountType === "fixed") {
        discountAmount = selectedVoucher.voucherId.discountValue;
      } else if (selectedVoucher.voucherId?.discountType === "percentage") {
        discountAmount = Math.floor(
          (selectedVoucher.voucherId.discountValue / 100) * totalPrice
        );
      }
    }

    // Tổng sau khi giảm
    const totalAfterDiscount = Math.max(totalPrice - discountAmount, 0);

    return {
      totalPrice,
      discountAmount,
      totalAfterDiscount,
    };
  }
);
