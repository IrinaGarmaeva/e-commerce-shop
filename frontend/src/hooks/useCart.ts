import { IProduct } from "../types";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleAddToCart = (product: IProduct, newQuantity: number) => {
    const updatedQuantity = Math.min(newQuantity, product.countInStock);

    if (updatedQuantity < newQuantity) {
      toast.error("Not enough stock available");
    }
    dispatch(addToCart({ ...product, quantity: updatedQuantity }));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (item: IProduct) => {
    const newQuantity = item.quantity! + 1;
    pathname === "/cart" && handleAddToCart(item, newQuantity);
  };

  const handleDecrementQuantity = (item: IProduct) => {
    const newQuantity = Math.max(item.quantity! - 1, 0);

    if (pathname === "/cart") {
      newQuantity === 0
        ? handleRemoveFromCart(item._id)
        : handleAddToCart(item, newQuantity);
    }
  };

  const handleChangeQuantity = (item: IProduct, newQuantity: number) => {
    handleAddToCart(item, newQuantity);
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleChangeQuantity,
  };
};
