import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOrderDetailsQuery } from "../../../redux/slices/ordersApiSlice/ordersApiSlice";
import Loader from "../../design-system/Loader/Loader";
import { IOrderItem } from "../../../types";
import OrderSummary from "../../design-system/OrderSummary/OrderSummary";
import { RootState } from "../../../redux/store";
import PaymentActions from "../../design-system/PaymentActions/PaymentActions";

const Order = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, error, isLoading } = useGetOrderDetailsQuery(orderId);

  console.log('order in cert', order)

  const { userInfo } = useSelector((state: RootState) => state.auth);

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
  if (error)
    return (
      <div className="max-container padding py-10 text-center text-lg">
        There is an error
      </div>
    );

  return (
    <section className="max-container padding py-10 text-text-main max-lg:flex max-lg:flex-col">
      <h2 className="font-bold text-xl">Order {orderId}</h2>
      <button
        className="bg-pink px-10 py-3 mt-4 text-white rounded-md font-semibold w-40 ease-linear transition-all hover:scale-105"
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
          {!order.isConfirmed && <PaymentActions />}
        </div>
      </div>
    </section>
  );
};

export default Order;
