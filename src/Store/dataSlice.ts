import { createSlice } from "@reduxjs/toolkit";

interface productDataInterface {
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

const initialState: {
  productData: productDataInterface[];
} = {
  productData: [],
};

const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    ADD_SERVER_DATA: (state, action) => {
      const payload: productDataInterface[] = action.payload;

      state.productData = payload;
    },
  },
});

export const { ADD_SERVER_DATA } = productSlice.actions;

export default productSlice.reducer;
