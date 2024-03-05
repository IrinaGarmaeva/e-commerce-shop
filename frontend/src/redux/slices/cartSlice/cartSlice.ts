import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ICartState, IShippingDetails } from "../../../types";
import { updateCart } from "../../../utils/cartUtils";

const initialState: ICartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [], shippingAdress: {}, paymentMethod: '' };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x: IProduct) => x._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x: IProduct) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id.toString() !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAdress: (state, action: PayloadAction<IShippingDetails>) => {
      state.shippingAddress = action.payload;
      return updateCart(state)
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      return updateCart(state)
    }
  },
});

export const { addToCart, removeFromCart, saveShippingAdress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;
