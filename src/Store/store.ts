import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import productReducer from "./dataSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    productData:productReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
