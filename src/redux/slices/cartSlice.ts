import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, CartState } from "../../utils/interface";

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const itemExists = state.items.find(item => item.id === action.payload.id
      );
      itemExists
        ? (itemExists.quantity += 1)
        : state.items.push({ ...action.payload, quantity: 1 });
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      item && item.quantity > 1
        ? (item.quantity -= 1)
        : (state.items = state.items.filter(
            (item) => item.id !== action.payload
          ));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
