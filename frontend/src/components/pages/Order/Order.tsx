import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../../redux/slices/ordersApiSlice/ordersApiSlice";
import Loader from "../../design-system/Loader/Loader";
import { IOrderItem } from "../../../types";

const Order = () => {
  const { orderId } = useParams();

  const { data: order, error, isLoading } = useGetOrderDetailsQuery(orderId);

  const renderOrderItems = () => {
    return order.orderItems.map((item: IOrderItem, index) => (
      <div key={index} className="border-b border-light-gray flex py-3">
        <Link to={`/product/${item.product}`}>
          <img
            src={item.image}
            className="rounded w-24 h-24 object-cover"
            alt={item.name}
          />
        </Link>
        <Link to={`/product/${item.product}`} className="pl-6 w-3/6">
          {item.name}
        </Link>
        <p className="pl-3">
          {item.quantity} x {item.price} = {item.quantity! * item.price}
        </p>
      </div>
    ));
  };

  if (isLoading) return <Loader />;
  if (error) return <div>There is an error</div>;

  return (
    <section className="max-container padding py-10  text-text-main">
      <h2 className="font-bold text-xl">Order {orderId}</h2>
      <div className="flex flex-row justify-between items-start justify-items-center box-border mt-5 w-11/12">
        <div id="1col" className="shadow-lg rounded-md p-2 grow-0 shrink-0">
          <div className="">
            <div className="px-3 py-4 border-b border-light-gray">
              <h2 className="pb-3 font-semibold text-lg">Shipping</h2>
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
                <p>Devivered on {order.deliveredAt}</p>
              ) : (
                <p>Not delivered</p>
              )}
            </div>
            <div className="px-3 py-4 border-b border-light-gray">
              <h2 className="pb-3 font-semibold text-lg">Payment Method</h2>
              <p>
                <strong className="font-semibold">Method: </strong>{" "}
                {order.paymentMethod}
              </p>
              {order.isPaid ? <p>Paid on {order.paidAt}</p> : <p>Not paid</p>}
            </div>
            <div className="px-3 py-4">
              <h2 className="pb-3 font-semibold text-lg">Order Items</h2>
              <div> {renderOrderItems()}</div>
            </div>
          </div>
        </div>
        <div
          id="2col"
          className="flex flex-col ml-8 w-80 rounded-md shadow-lg p-2 text-nowrap"
        >
          <div className="py-4 border-b border-light-gray">
            <h2 className="mb-2 px-3 font-bold">Order Summary</h2>
          </div>
          <table className="table-auto ml-3 mt-3">
            <tbody>
              <tr>
                <td className="py-1 pr-2">Items</td>
                <td className="py-1">{order.itemsPrice} RSD</td>
              </tr>
              <tr>
                <td className="py-1 pr-2">Shipping</td>
                <td className="py-1">{order.shippingPrice} RSD</td>
              </tr>
              <tr>
                <td className="py-1 pr-2">Tax</td>
                <td className="py-1">{order.taxPrice} RSD</td>
              </tr>
              <tr>
                <td className="py-1 pr-2">Total</td>
                <td className="py-1">{order.totalPrice} RSD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Order;
