import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface CartItem {
  delivered: string;  
    department: string;
    description: string;
    imageUrl: string;
    name: string;
    price: number;
    stock: number;
    supplier: string;
    id: string;
}

interface CartState {
  cartData: CartItem[];
}

const initialState: CartState = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_CART_DATA: (state, action) => {
      const payload: CartItem = action.payload;
      if (!state.cartData.some((item) => item.id === payload.id)) {
        state.cartData = [...state.cartData, payload];
        toast.success("The item is added to the cart");
      } else {
        toast.error("The item is already present in the cart");
      }
    },
    REMOVE_CART_DATA: (state, action) => {
      const payload: CartItem = action.payload;
      state.cartData = state.cartData.filter((item) => item.id !== payload.id);
      toast.success("Item is removed from cart");
    },
    CLEAR_CART_DATA: (state) => {
      state.cartData.length = 0;
    },
  },
});

export const { ADD_CART_DATA, REMOVE_CART_DATA, CLEAR_CART_DATA } =
  cartSlice.actions;

export default cartSlice.reducer;
