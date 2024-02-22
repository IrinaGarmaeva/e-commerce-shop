import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct,ICartState } from "../../../types";
import LocalStorage from "../../../utils/localStorageActions";

const initialState: ICartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [] };

const addDecimals = (number: number): string => {
  return (Math.round(number * 100) / 100).toFixed(2);
};

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

      //Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc: number, item: IProduct) => acc + item.price * item.quantity!,
          0
        )
      );

      //Calculate shipping price. If order is equal or over 5000 RSD then free, else 400 RSD shipping)
      state.shippingPrice = addDecimals(Number(state.itemsPrice) >= 5000 ? 0 : 400);

      //Calculate tax price - 20%
      state.taxPrice = addDecimals(Number((0.8 * Number(state.itemsPrice)).toFixed(2)));

      //Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) + Number(state.shippingPrice)
      ).toFixed(2);

      LocalStorage.setItem("cart", state)
    },
  },
});

export const {addToCart } = cartSlice.actions

export default cartSlice.reducer;
