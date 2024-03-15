import { FC } from "react";
import { ICartState, IOrder } from "../../../types";

type OrderSummaryProps = {
  order: ICartState | IOrder;
};

const OrderSummary: FC<OrderSummaryProps> = ({ order }) => {
  return (
    <>
      <div className="py-4 border-b border-light-gray">
        <h2 className="mb-2 px-3 font-bold">Order Summary</h2>
      </div>
      <table className="table-auto ml-3 mt-3">
        <tbody>
          <tr>
            <td className="py-1 pr-2">Items</td>
            <td className="py-1 text-center">{order.itemsPrice} RSD</td>
          </tr>
          <tr>
            <td className="py-1 pr-2">Shipping</td>
            <td className="py-1 text-center">{order.shippingPrice} RSD</td>
          </tr>
          <tr>
            <td className="py-1 pr-2">Tax</td>
            <td className="py-1 text-center">{order.taxPrice} RSD</td>
          </tr>
          <tr>
            <td className="py-1 pr-2">Total</td>
            <td className="py-1 text-center">{order.totalPrice} RSD</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderSummary;
