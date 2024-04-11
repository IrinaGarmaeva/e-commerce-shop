import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ROUTES } from "../../../utils/constants";
import { IProduct } from "../../../types";
import { MdDeleteOutline } from "react-icons/md";

import CartOnSmallScreen from "./CartOnSmallScreen";
import { useCart } from "../../../hooks/useCart";

const Cart = () => {
  const navigate = useNavigate();

  const {
    handleRemoveFromCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleChangeQuantity
  } = useCart();

  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  const handleNavigateToProductDetailsPage = (item: IProduct) => {
    navigate(`${ROUTES.catalog}/${item._id}`);
  };

  const subtotal: number = Number(
    cartItems
      .reduce((acc, item) => acc + item.quantity! * item.price, 0)
      .toFixed(2)
  );
  const shipping = subtotal >= 5000 ? "FREE" : "400 RSD";
  const total = subtotal + (shipping === "FREE" ? 0 : 400);

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  }


  return (
    <section className="max-container padding py-10 flex justify-center flex-col">
      <h2 className="text-center text-2xl">Shopping Cart</h2>
      <div className="flex justify-center">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center mt-10">
            <p>Your cart is empty</p>
            <Link to={ROUTES.home} className="mt-3">
              <span className="text-pink hover:scale-110">Click here</span> to
              continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex justify-between w-full pt-4 max-lg:flex-col xl:w-10/12 max-lg:justify-center max-lg:w-full">
            <table className="max-lg:w-full max-sm:hidden">
              <tbody>
                {cartItems.map((item: IProduct) => (
                  <tr
                    key={item._id}
                    className="flex flex-row justify-between items-center border-b border-[#ececec]"
                  >
                    <td className="py-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                        onClick={() => handleNavigateToProductDetailsPage(item)}
                      />
                    </td>
                    <td
                      className="p-2 w-72"
                      onClick={() => handleNavigateToProductDetailsPage(item)}
                    >
                      {item.description}
                    </td>
                    <td className="p-2 text-uppercase">{item.price} RSD</td>
                    <td className="flex flex-row flex-nowrap justify-between items-center border border-[#ececec] bg-[#f8f8f8] px-3 max-h-12 rounded-sm">
                      <button
                        onClick={() => handleDecrementQuantity(item)}
                        className="text-3xl text-text-main ease-linear transition-allhover:text-pink"
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
                        className="focus:outline-none text-center max-w-9 bg-transparent"
                      />
                      <button
                        className="text-3xl text-text-main ease-linear transition-all hover:text-pink"
                        onClick={() => handleIncrementQuantity(item)}
                      >
                        +
                      </button>
                    </td>
                    <td className="py-2 pl-2">
                      <MdDeleteOutline
                        size={20}
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="hover:text-pinkc cursor-pointer text-[#474A51]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CartOnSmallScreen
              cartItems={cartItems}
              handleNavigateToProductDetailsPage={handleNavigateToProductDetailsPage}
              handleDecrementQuantity={handleDecrementQuantity}
              handleChangeQuantity={handleChangeQuantity}
              handleIncrementQuantity={handleIncrementQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
            />
            <div className="pt-3 max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:pt-8 max-sm:text-sm">
              <h2 className="text-uppercase font-semibold max-lg:text-center">
                SUMMARY
              </h2>
              <table>
                <tbody>
                  <tr>
                    <td className="py-2">
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.quantity!, 0)}
                      ) items:
                    </td>
                    <td className="p-2 text-right w-28">{subtotal} RSD</td>
                  </tr>
                  <tr>
                    <td className="py-2">Shipping:</td>
                    <td
                      className={`p-2 text-right w-28 ${
                        shipping === "FREE" ? "text-pink font-medium" : ""
                      }`}
                    >
                      {shipping}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Total:</td>
                    <td className="p-2 text-right font-semibold w-28">
                      {total} RSD
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-pink text underline underline-offset-4 text-sm">
                I have promocode
              </p>
              <button
                className="w-full mt-4 py-3 bg-pink text-white font-semibold rounded-md"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Continue to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
