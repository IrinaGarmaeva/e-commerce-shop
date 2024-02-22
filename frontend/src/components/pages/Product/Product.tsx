import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../../redux/slices/apiSlices/productsSlice/productsSlice";
import Loader from "../../design-system/Loader/Loader";

const Product = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

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
              <div className="flex flex-row justify-between">
                <input type="number" min={1} max={5} placeholder="1" />
                <button
                  className="bg-pink rounded-md text-white px-5 py-3 ease-linear transition-all hover:scale-105"
                  disabled={product?.countInStock === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
