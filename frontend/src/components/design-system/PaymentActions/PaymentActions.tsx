import Loader from "../Loader/Loader";
import CertificateInput from "../CertificateInput/CertificateInput";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  usePayOrderByCardMutation,
  useConfirmOrderMutation,
} from "../../../redux/slices/ordersApiSlice/ordersApiSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PaymentActions = () => {
  const [isOpenCertificateInput, setIsOpenCertificateInput] =
    useState<boolean>(false);
  const { orderId } = useParams();

  const { data: order, refetch } = useGetOrderDetailsQuery(orderId);
  const [payOrderByCard, { isLoading: loadingPay }] = usePayOrderByCardMutation();
  const [confirmOrder, { isLoading: loadingConfirm }] =
    useConfirmOrderMutation();

  const approveTestPay = async () => {
    if (!orderId || !order) {
      return;
    }

    await payOrderByCard({ orderId, details: order });
    refetch();
    toast.success("Payment successful");
  };

  const handleConfirmOrder = async () => {
    if (!orderId || !order) {
      return;
    }

    await confirmOrder({ orderId, details: order });
    refetch();
    toast.success("Confirm successful");
  };

  return (
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
            className="bg-pink px-10 py-3 mt-4 text-white rounded-md w-full font-semibold ease-linear transition-all hover:scale-105"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
          {loadingConfirm && <Loader />}
        </div>
      )}
      {order.paymentMethod === "Gift Certificate" && (
        <div className="flex justify-center my-4">
          <p
            className="text-pink text underline underline-offset-4 text-lg"
            onClick={() => setIsOpenCertificateInput(!isOpenCertificateInput)}
          >
            Enter certificate number
          </p>
        </div>
      )}
      {isOpenCertificateInput && <CertificateInput />}
    </div>
  );
};

export default PaymentActions;
