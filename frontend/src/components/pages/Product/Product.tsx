import { useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductDetailsQuery } from "../../../redux/slices/productsSlice/productsSlice";
import Loader from "../../design-system/Loader/Loader";
import { addToCart } from "../../../redux/slices/cartSlice/cartSlice";
import {ROUTES} from '../../../utils/constants'

const Product = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value))
  }

  const handleAddToCart = () => {
    dispatch(addToCart({...product, quantity}))
    navigate(ROUTES.cart)
  }

  return (
    <section className="max-container padding py-10 flex justify-center">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>There is an error</div>
      ) : (
        <div className="flex flex-col w-4/5">
          <p className="text-light-gray">{`Home - Catalog - ${product?.category} - ${product?.name}`}</p>
          <div className="mt-5 flex flex-row gap-10 max-sm:flex-col max-sm:gap-5">
            <div className="w-[460px] h-96 max-sm:w-full">
              <img
                src={product?.image}
                alt={product?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-6 max-sm:gap-3">
              <h3 className="uppercase font-semibold">{product?.name}</h3>
              <p>{product?.description}</p>
              <p className="font-semibold ">{`${product?.price} RSD`}</p>
              {product.countInStock > 0 && (
                <div className="flex flex-row justify-between">
                <input type="number" min={1} max={product.countInStock} placeholder="1" value={quantity} onChange={handleChange}/>
                <button
                  className="bg-pink rounded-md text-white px-5 py-3 ease-linear transition-all hover:scale-105"
                  disabled={product?.countInStock === 0}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
