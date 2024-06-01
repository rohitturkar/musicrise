import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Define the type for a wishlist item
interface WishlistItem {
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

// Define the type for the wishlist slice state
interface WishlistState {
  wishlistData: WishlistItem[];
}

// Define the initial state using the WishlistState type
const initialState: WishlistState = {
  wishlistData: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    ADD_WISHLIST_DATA: (state, action) => {
      const payload: WishlistItem = action.payload;
      if (!state.wishlistData.some((item) => item.id === payload.id)) {
        state.wishlistData = [...state.wishlistData, payload];
      }
      toast.success('Item is added to wishlist');
    },
    REMOVE_WISHLIST_DATA: (state, action) => {
      const payload: WishlistItem = action.payload;
      state.wishlistData = state.wishlistData.filter((item) => item.id !== payload.id);
      toast.success('Item is removed from wishlist');
    },
    CLEAR_WISHLIST_DATA: (state) => {
      state.wishlistData.length = 0;
    },
  },
});

export const { ADD_WISHLIST_DATA, REMOVE_WISHLIST_DATA, CLEAR_WISHLIST_DATA } = wishlistSlice.actions;

export default wishlistSlice.reducer;
