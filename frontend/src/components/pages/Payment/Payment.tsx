import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../design-system/CheckoutSteps/CheckoutSteps";
import Input from "../../design-system/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ROUTES } from "../../../utils/constants";
import { savePaymentMethod } from "../../../redux/slices/cartSlice/cartSlice";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate(ROUTES.shipping);
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate(ROUTES.placeorder);
  };

  return (
    <section className="max-container padding py-10">
      <div className="flex flex-col justify-center items-center text-text-main">
      <h2 className="text-2xl mt-6">Payment Method</h2>
        <CheckoutSteps step1 step2 step3 className={'mt-5'} />
        <form onSubmit={handleSubmit} className="flex flex-col mt-5">
          <label className="text-center">Select Method</label>
          <div className="mt-3">
            <Input
              type="radio"
              name="paymentMethod"
              inputClassName="appearance-none h-3 w-3 bg-white border-[1px] border-[#C5C5C5] rounded-full checked:bg-pink checked:border-gray-800 transition-all duration-700 ease-out"
              value="PayPal"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            />
            <label htmlFor="paymentMethod" className="pl-3">
              Paypal or Credit card
            </label>
          </div>
          <div className="">
            <Input
              type="radio"
              name="paymentMethod"
              inputClassName="appearance-none h-3 w-3 bg-white border-[1px] border-[#C5C5C5] rounded-full checked:bg-pink checked:border-gray-800 transition-all duration-700 ease-out"
              value="Cash"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            />
            <label htmlFor="paymentMethod" className="pl-3">
              Cash on Delivery
            </label>
          </div>
          <div className="">
            <Input
              type="radio"
              name="paymentMethod"
              inputClassName="appearance-none h-3 w-3 bg-white border-[1px] border-[#C5C5C5] rounded-full checked:bg-pink checked:border-gray-800 transition-all duration-700 ease-out"
              value="Gift Certificate"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            />
            <label htmlFor="paymentMethod" className="pl-3">
              Gift Certificate
            </label>
          </div>
          <button
            type="submit"
            className="bg-pink px-6 py-3 mt-8 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default Payment;
