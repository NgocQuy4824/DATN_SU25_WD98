import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toogleAllCart: (state, action) => {
      state.items = action.payload;
    },
    selectItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, payload) => {
      const filteredItems = state.items.filter(
        (item) => item.variantId !== payload.payload
      );
      state.items = filteredItems;
    },
    updateQuantityItemCart: (state, action) => {
      const { variantId, quantity } = action.payload;
      const index = state.items.findIndex(
        (item) => item.variantId === variantId
      );
      if (index !== -1) {
        state.items[index].quantity = quantity;
      }
    },
  },
});

export const { toogleAllCart, selectItem, removeItem, updateQuantityItemCart } =
  cartSlice.actions;

export default cartSlice.reducer;
