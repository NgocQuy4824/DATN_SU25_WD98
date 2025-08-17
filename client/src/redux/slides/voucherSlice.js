import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedVoucher: null, 
};

// Load từ localStorage khi khởi tạo
const savedVoucher = localStorage.getItem("selectedVoucher");
if (savedVoucher) {
  initialState.selectedVoucher = JSON.parse(savedVoucher);
}

export const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    applyVoucher: (state, action) => {
      state.selectedVoucher = action.payload;
      localStorage.setItem("selectedVoucher", JSON.stringify(action.payload)); 
    },
    removeVoucher: (state) => {
      state.selectedVoucher = null;
      localStorage.removeItem("selectedVoucher");
      sessionStorage.removeItem("selectedVoucher")
    },
  },
});

export const { applyVoucher, removeVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
