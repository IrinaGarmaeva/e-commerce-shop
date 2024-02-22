import { ICartState, IProduct } from "../types";
import LocalStorage from "./localStorageActions";

export const addDecimals = (number: number): string => {
  return (Math.round(number * 100) / 100).toFixed(2);
};

export const updateCart = (state: ICartState) => {
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
  state.taxPrice = addDecimals(
    Number((0.8 * Number(state.itemsPrice)).toFixed(2))
  );

  //Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) + Number(state.shippingPrice)
  ).toFixed(2);

  LocalStorage.setItem("cart", state);
};
