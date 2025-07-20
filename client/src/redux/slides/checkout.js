import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerInfo: null,
  receiverInfo: null,
  address: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingInfor: (state, action) => {
      const { customerInfo, receiverInfo, address } = action.payload;
      state.customerInfo = customerInfo;
      state.receiverInfo = receiverInfo || customerInfo;
      state.address = address;
    },
    resetCheckout: (state) => {
      state.customerInfo = null;
      state.receiverInfo = null;
      state.address = null;
    },
  },
});

export const { setShippingInfor, resetCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
