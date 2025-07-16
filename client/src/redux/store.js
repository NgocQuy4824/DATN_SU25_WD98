import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slides/couterSlider";
import { cartSlice } from "./slides/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice,
  },
});
