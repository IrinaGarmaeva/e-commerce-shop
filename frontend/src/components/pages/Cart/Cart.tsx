import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ROUTES } from "../../../utils/constants";
import { IProduct } from "../../../types";
import { AiOutlineClose } from "react-icons/ai";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ productId, newQuantity }));
  };

  return (
    <section className="max-container padding py-10 flex justify-center flex-col">
      <h2 className="text-center">Shopping Cart</h2>
      <div className="">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center mt-10">
            <p className="">Your cart is empty</p>
            <Link to={ROUTES.home} className="mt-3"><span className="text-pink hover:scale-110">Click here</span> to continue shopping</Link>
          </div>
        ) : (
          <div className="">
            <table className="">
            {cartItems.map((item: IProduct) => (
                  <tr key={item._id} className="">
                    <td className="p-2">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                    </td>
                    <td className="p-2">{item.description}</td>
                    <td className="p-2">{`${item.price} RSD`}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        min={1}
                        max={item.countInStock}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                      />
                    </td>
                    <td className="p-2">
                      <AiOutlineClose size={20} onClick={() => handleRemoveFromCart(item._id)} className="hover:text-pinkc cursor-pointer"/>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
