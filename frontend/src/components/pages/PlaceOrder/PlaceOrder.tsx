import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { ROUTES } from "../../../utils/constants";
import CheckoutSteps from "../../design-system/CheckoutSteps/CheckoutSteps";
import { useCreateOrderMutation } from "../../../redux/slices/ordersApiSlice/ordersApiSlice";
import { clearCartItems } from "../../../redux/slices/cartSlice/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);


  const [createOrder] = useCreateOrderMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate(ROUTES.shipping);
    } else if (!cart.paymentMethod) {
      navigate(ROUTES.payment);
    }
  }, [navigate, cart.paymentMethod, cart.shippingAddress?.address]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingprice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        user: userInfo?._id
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-container padding py-10 max-lg:flex max-lg:flex-col">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-row justify-between items-start justify-items-center  box-border mt-5 w-11/12 text-text-main max-lg:flex-col max-lg:w-5/6 max-lg:self-center max-md:w-full">
        <div id="1col" className="shadow-md rounded-md p-2 shrink-0 max-lg:w-full">
          <div className="border-b border-light-gray">
            <div className="px-3 py-4">
              <h2 className="pb-3 font-semibold text-lg">Shipping</h2>
              <p>
                <strong className="font-semibold">Address: </strong>
                {cart.shippingAddress?.address}, {cart.shippingAddress?.city},{" "}
                {cart.shippingAddress?.postalCode},{" "}
                {cart.shippingAddress?.country}
              </p>
            </div>
          </div>
          <div className="border-b border-light-gray">
            <div className="px-3 py-4">
              <h2 className="pb-3 font-semibold text-lg">Payment Method</h2>
              <p>
                <strong className="font-semibold">Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
          </div>
          <div className="p-2">
            <div className="px-3 py-4">
              <h2 className="pb-3 font-semibold text-lg">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div className="mt-3">
                  {cart.cartItems.map((item, index) => (
                    <div className="border-b border-light-gray flex py-3 max-sm:flex-col" key={index}>
                      <div className="flex w-2/3 max-sm:w-full">
                        <Link to={`/product/${item._id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </Link>
                        <Link to={`/product/${item._id}`} className="pl-6 w-2/3 max-sm:w-4/6">
                          {item.name}
                        </Link>
                      </div>
                      <p className="text-nowrap pl-3 max-sm:pl-0 max-sm:pt-3 max-sm:text-right">
                        {item.quantity} x {item.price} ={" "}
                        {item.quantity! * item.price}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="2col" className="flex flex-col ml-8 w-80 rounded-md shadow-md p-2 text-nowrap max-lg:ml-0 max-lg:mt-3 max-lg:w-full bg-[#f5f5f5]">
          <h2 className="mb-2 px-3 font-bold">Order Summary</h2>
          <table className="table-auto ml-3 mt-3">
            <tbody>
              <tr>
                <td className="py-1 pr-2">Items</td>
                <td className="py-1 text-center">{cart.itemsPrice} RSD</td>
              </tr>
              <tr>
                <td className="py-1 pr-2">Shipping</td>
                <td className="py-1 text-center">{cart.shippingPrice} RSD</td>
              </tr>
              <tr>
                <td className="py-1 pr-2">Tax</td>
                <td className="py-1 text-center">{cart.taxPrice} RSD</td>
              </tr>
              <tr>
                <td className="py-1 pr-2">Total</td>
                <td className="py-1 text-center">{cart.totalPrice} RSD</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="bg-pink px-6 py-3 mt-4 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {/* {isLoading && <Loader />} */}
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
