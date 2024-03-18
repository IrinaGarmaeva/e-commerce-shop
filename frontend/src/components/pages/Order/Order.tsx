import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../../redux/slices/ordersApiSlice/ordersApiSlice";
import Loader from "../../design-system/Loader/Loader";
import { IOrderItem } from "../../../types";
import OrderSummary from "../../design-system/OrderSummary/OrderSummary";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import { TfiArrowCircleRight } from "react-icons/tfi";
import {
  handleChangeInput,
  VALIDATION_MESSAGES,
  isValidCertificate,
} from "../../../utils/validationConstants";
import Button from "../../design-system/Button/Button";

const Order = () => {
  const [isOpenCertificateInput, setIsOpenCertificateInput] =
    useState<boolean>(false);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    error,
    isLoading,
    refetch,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
  } = useFormAndValidation({
    certificateNumber: "",
  });

  const checkValidity = isValid ? "disabled" : "";

  useEffect(() => {
    if (errors.certificateNumber || !values.certificateNumber) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const approveTestPay = async () => {
    if (!orderId || !order) {
      return;
    }

    await payOrder({ orderId, details: order });
    refetch();
    toast.success("Payment successful");
  };

  const addCertificateNumber = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderId || !order) {
      return;
    }

    if (!values.certificateNumber) {
      setErrors({
        certificateNumber: VALIDATION_MESSAGES.emptyCertificateNumber,
      });
    } else {
      setValues({ certificateNumber: "" });
      await payOrder({ orderId, details: order });
      refetch();
      toast.success("Payment successful");
    }
  };

  const renderOrderItems = () => {
    return order.orderItems.map((item: IOrderItem, index: number) => (
      <div
        key={index}
        className="border-b border-light-gray flex py-3 max-sm:flex-col"
      >
        <div className="flex w-2/3 max-sm:w-full">
          <Link to={`/product/${item.product}`}>
            <img
              src={item.image}
              className="rounded w-24 h-24 object-cover"
              alt={item.name}
            />
          </Link>
          <Link
            to={`/product/${item.product}`}
            className="pl-6 w-2/3 max-sm:w-4/6"
          >
            {item.name}
          </Link>
        </div>
        <p className="pl-3 max-sm:pl-0 max-sm:pt-3 max-sm:text-right text-nowrap">
          {item.quantity} x {item.price} = {item.quantity! * item.price}
        </p>
      </div>
    ));
  };

  if (isLoading) return <Loader />;
  if (error) return <div>There is an error</div>;

  return (
    <section className="max-container padding py-10 text-text-main max-lg:flex max-lg:flex-col">
      <h2 className="font-bold text-xl">Order {orderId}</h2>
      <button
        className="bg-pink px-10 py-3 mt-4 text-white rounded-md font-semibold"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <div className="flex flex-row justify-between items-start justify-items-center box-border mt-5 w-11/12 max-lg:self-center max-lg:flex-col max-lg:w-5/6 max-md:w-full">
        <div className="shadow-md rounded-md p-2 shrink-0 max-lg:w-full">
          <div>
            <div className="px-3 py-4 border-b border-light-gray">
              <h3 className="pb-3 font-semibold text-lg">Shipping</h3>
              <p>
                <strong className="font-semibold">Name: </strong>{" "}
                {order.user.name}
              </p>
              <p>
                <strong className="font-semibold">Email: </strong>{" "}
                {order.user.email}
              </p>
              <p>
                <strong className="font-semibold">Address: </strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <p className="bg-[#D1F2EB] py-5 px-3 w-full text-[#13967D] border border-[#a3e4d7] rounded-md mt-3">
                  Devivered on {order.deliveredAt}
                </p>
              ) : (
                <p className="bg-[#FADBD8] py-5 px-3 w-full text-red border border-[#F5B7B1] rounded-md mt-3">
                  Not delivered
                </p>
              )}
            </div>
            <div className="px-3 py-4 border-b border-light-gray">
              <h3 className="pb-3 font-semibold text-lg">Payment Method</h3>
              <p>
                <strong className="font-semibold">Method: </strong>{" "}
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <p className="bg-[#D1F2EB] py-5 px-3 w-full text-[#13967D] border border-[#a3e4d7] rounded-md mt-3">
                  Paid on {order.paidAt}
                </p>
              ) : (
                <p className="bg-[#FADBD8] py-5 px-3 w-full text-red border border-[#F5B7B1] rounded-md mt-3">
                  Not paid
                </p>
              )}
            </div>
            <div className="px-3 py-4">
              <h3 className="pb-3 font-semibold text-lg">Order Items</h3>
              <div>{renderOrderItems()}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-8 w-80 rounded-md shadow-md p-2 text-nowrap bg-[#f5f5f5] max-lg:ml-0 max-lg:mt-3 max-lg:w-full">
          <OrderSummary order={order} />
          {!order.isPaid && (
            <div>
              {loadingPay && <Loader />}
              {order.paymentMethod === "PayPal" && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="bg-pink px-10 py-3 mt-4 text-white rounded-md w-full"
                    onClick={approveTestPay}
                  >
                    Test Pay Order
                  </button>
                </div>
              )}
              {order.paymentMethod === "Cash" && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="bg-pink px-10 py-3 mt-4 text-white rounded-md w-full"
                  >
                    Confirm Order
                  </button>
                </div>
              )}
              {order.paymentMethod === "Gift Certificate" && (
                <div className="flex justify-center my-4">
                  <p
                    className="text-pink text underline underline-offset-4 text-lg"
                    onClick={() =>
                      setIsOpenCertificateInput(!isOpenCertificateInput)
                    }
                  >
                    Enter certificate number
                  </p>
                </div>
              )}
              {isOpenCertificateInput && (
                <form
                  onSubmit={addCertificateNumber}
                  className="mt-4 max-sm:w-full"
                  noValidate
                  autoComplete="off"
                >
                  <div className="flex flex-row relative mb-3 bg-white rounded-md outline outline-1 outline-pink">
                    <input
                      type="certificateNumber"
                      value={values.certificateNumber}
                      name="certificateNumber"
                      placeholder="Your certificate number"
                      onChange={(e) =>
                        handleChangeInput(
                          e,
                          errors,
                          setErrors,
                          handleChange,
                          VALIDATION_MESSAGES.invalidCertificateNumber,
                          isValidCertificate
                        )
                      }
                      autoComplete="off"
                      className="w-10/12 pl-3 h-12 outline-none rounded-md text-sm text-text-main"
                    />
                    <Button
                      type="submit"
                      disabled={checkValidity}
                      children={
                        <TfiArrowCircleRight
                          size={22}
                          className={`absolute right-3 top-3.5 z-10 ${
                            isValid ? "text-pink" : "text-gray"
                          }`}
                        />
                      }
                    />
                  </div>
                  <span className="text-sm pl-3">
                    {errors.certificateNumber}
                  </span>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;
