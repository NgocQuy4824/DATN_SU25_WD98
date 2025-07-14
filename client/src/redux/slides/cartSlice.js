import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toogleAllCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { toogleAllCart } = cartSlice.actions;

export default cartSlice.reducer;
