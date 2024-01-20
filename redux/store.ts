import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './features/cartSlice'
import  favoriteSlice  from "./features/favoriteSlice";
export const store = configureStore({
  reducer: {
    cart:cartSlice,
    favorite:favoriteSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
