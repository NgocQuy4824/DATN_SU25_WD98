import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './slides/couterSlider'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
})