import {FC} from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { IProduct } from "../../../types";

type CartOnSmallScreenProps = {
  cartItems: IProduct[];
  handleNavigateToProductDetailsPage: (item: IProduct) => void;
  handleDecrementQuantity: (item: IProduct) => void;
  handleChangeQuantity: (item: IProduct, newQuantity: number) => void;
  handleIncrementQuantity: (item: IProduct) => void;
  handleRemoveFromCart:  (id: string) => void;
};

const CartOnSmallScreen: FC<CartOnSmallScreenProps> = ({
  cartItems,
  handleNavigateToProductDetailsPage,
  handleDecrementQuantity,
  handleChangeQuantity,
  handleIncrementQuantity,
  handleRemoveFromCart,
}) => {
  return (
    <div className="w-full sm:hidden">
      {cartItems.map((item: IProduct) => (
        <div
          key={item._id}
          className="border-b border-[#ececec] mb-4 pb-4 text-sm"
        >
          {/* 1st row */}
          <div className="flex items-center w-full">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover cursor-pointer"
              onClick={() => handleNavigateToProductDetailsPage(item)}
            />
            <p
              className="w-2/3 ml-4 pr-2"
              onClick={() => handleNavigateToProductDetailsPage(item)}
            >
              {item.description}
            </p>
            <div className="flex pl-4 justify-end">
              <MdDeleteOutline
                size={20}
                onClick={() => handleRemoveFromCart(item._id)}
                className="hover:text-pink cursor-pointer text-[#474A51] "
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border border-[#ececec] bg-[#f8f8f8] px-2 max-h-8 rounded-sm w-24">
              <button
                onClick={() => handleDecrementQuantity(item)}
                className="text-3xl text-text-main transition-all hover:text-pink"
              >
                -
              </button>
              <input
                type="text"
                max={item.countInStock}
                value={item.quantity}
                onChange={(e) =>
                  handleChangeQuantity(item, Number(e.target.value))
                }
                className="focus:outline-none text-center w-9 bg-transparent mx-2"
              />
              <button
                onClick={() => handleIncrementQuantity(item)}
                className="text-3xl text-text-main transition-all hover:text-pink"
              >
                +
              </button>
            </div>
            <p className="p-2 text-uppercase text-right">{item.price} RSD</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartOnSmallScreen;
