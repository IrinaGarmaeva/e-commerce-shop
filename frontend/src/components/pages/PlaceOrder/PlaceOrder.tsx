import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { ROUTES } from "../../../utils/constants";
import CheckoutSteps from "../../design-system/CheckoutSteps/CheckoutSteps";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../../redux/slices/ordersApiSlice/ordersApiSlice";
import { clearCartItems } from "../../../redux/slices/cartSlice/cartSlice";
import Loader from "../../design-system/Loader/Loader";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate(ROUTES.shipping);
    } else if (!cart.paymentMethod) {
      navigate(ROUTES.payment);
    }
  }, [navigate, cart.paymentMethod, cart.shippingAddress?.address]);

  const placeOrderHandler = async () => {
    console.log("1111");
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingprice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalprice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-container padding py-10">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-row justify-between box-border mt-5 w-11/12 text-text-main">
        <div className="shadow-lg rounded-md  p-2">
          <div className="border-b border-light-gray">
            <div className="px-3 py-4">
              <h2 className="pb-2">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress?.address}, {cart.shippingAddress?.city},{" "}
                {cart.shippingAddress?.postalCode},{" "}
                {cart.shippingAddress?.country}
              </p>
            </div>
          </div>
          <div className="border-b border-light-gray">
            <div className="px-3 py-4">
              <h2 className="pb-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
          </div>
          <div className="p-2">
            <div className="px-3 py-4">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div className="mt-3">
                  {cart.cartItems.map((item, index) => (
                    <div className="flex justify-between mt-3" key={index}>
                      <div className="flex">
                        <Link to={`/${item._id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </Link>
                        <Link to={`/${item._id}`} className="pl-4">
                          {item.description}
                        </Link>
                      </div>
                      <p className="px-2 text-nowrap">
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
        <div className="flex flex-col ml-8 w-80 rounded-md shadow-lg p-2">
          <h2 className="mb-2 px-3 font-bold">Order Summary</h2>
          <div className="flex justify-between px-3 py-4 border-b border-light-gray">
            <p>Items:</p>
            <p>{cart.itemsPrice} RSD</p>
          </div>
          <div className="flex justify-between px-3 py-4 border-b border-light-gray">
            <p>Shipping:</p>
            <p>{cart.shippingPrice} RSD</p>
          </div>
          <div className="flex justify-between px-3 py-4 border-b border-light-gray">
            <p>Tax:</p>
            <p>{cart.taxPrice} RSD</p>
          </div>
          <div className="flex justify-between px-3 py-4 border-b border-light-gray">
            <p>Total:</p>
            <p>{cart.totalPrice} RSD</p>
          </div>
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
