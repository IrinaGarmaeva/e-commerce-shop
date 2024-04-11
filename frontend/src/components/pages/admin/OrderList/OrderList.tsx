import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../../../redux/slices/ordersApiSlice/ordersApiSlice";
import Loader from "../../../design-system/Loader/Loader";
import { IOrder } from "../../../../types";
import {
  formatISODate,
  formatUnixTimestamp,
} from "../../../../utils/dateFormatting";
import { FaTimes } from "react-icons/fa";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery("");

  return (
    <section className="max-container padding py-10">
      <h2 className="text-2xl mt-6">Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>There is an error</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto mt-6 text-center text-text-main">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">USER</th>
                <th scope="col">DATE</th>
                <th scope="col">TOTAL</th>
                <th scope="col">PAID</th>
                <th scope="col">DELIVERED</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: IOrder) => (
                <tr key={order._id}>
                  <td className="py-2 px-2 whitespace-nowrap">{order._id}</td>
                  <td className="py-2 px-2 whitespace-nowrap">
                    {order.user && order.user.name}
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap">
                    {formatISODate(order.createdAt!)}
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap">
                    {order.totalPrice} RSD
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap">
                    <div className="flex justify-center items-center">
                      {order.isPaid ? (
                        formatUnixTimestamp(order.paidAt!)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap">
                    <div className="flex justify-center items-center">
                      {order.isDelivered ? (
                        formatUnixTimestamp(order.deliveredAt!)
                      ) : (
                        <FaTimes
                          style={{ color: "red", alignSelf: "center" }}
                        />
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap ">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-pink text-white px-3 py-1 border border-pink rounded-md text-center ease-linear transition-all hover:scale-105 font-medium">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default OrderList;
