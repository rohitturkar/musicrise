import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import productReducer from "./dataSlice"
import authReducer from "./authSlice"


const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    productData:productReducer,
    auth:authReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
