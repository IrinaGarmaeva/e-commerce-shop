import { useParams, useNavigate } from "react-router-dom";
import ProductList from "../../design-system/ProductList/ProductList";
import { useGetProductsQuery } from "../../../redux/slices/productsSlice/productsSlice";
import Loader from "../../design-system/Loader/Loader";

const Home = () => {
  let { keyword } = useParams();
  if (!keyword) {
    keyword = "";
  }
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword });
  const navigate = useNavigate();

  return (
    <section className="max-container padding py-10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          There is an error
          {/* {error?.data?.message || error.error} */}
        </div>
      ) : (
        <>
          {products?.length ? (
            <>
              <h1 className="text-center">Latest Products</h1>
              <ProductList products={products!} />
            </>
          ) : (
            <div className="flex flex-col items-center ">
              <p className="text-center text-pink font-semibold mb-8">
                Search results
              </p>
              <h2 className="text-center font-bold text-text-main">
                Sorry, we couldn’t find any results for "{keyword}"
              </h2>
              <p className="text-center pt-3">Try again using another word</p>
              <button
                className="bg-pink px-10 py-3 mt-4 text-white rounded-md font-semibold w-40 ease-linear transition-all hover:scale-105"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
              {/* add best sellers pagination */}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Home;
