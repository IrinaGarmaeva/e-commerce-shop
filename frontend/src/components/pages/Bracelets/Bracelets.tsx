import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../../redux/slices/productsSlice/productsSlice";
import { getCategoryFromPathname } from "../../../utils/utils";
import ProductList from "../../design-system/ProductList/ProductList";
import Loader from "../../design-system/Loader/Loader";

const Bracelets = () => {
  const [category, setCategory] = useState<string | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentCategory = getCategoryFromPathname(pathname);
    setCategory(currentCategory);
  }, [pathname]);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery({ category: category || "" });

  return (
    <section className="max-container padding py-10 flex justify-center">
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
          <ProductList products={products!} />
        ) : (
          <div className="flex flex-col items-center ">
            <h2 className="text-center font-bold text-text-main">
              Sorry, there are no products in that category"
            </h2>
            <button
              className="bg-pink px-10 py-3 mt-4 text-white rounded-md font-semibold w-40 ease-linear transition-all hover:scale-105"
              onClick={() => navigate("/")}
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

export default Bracelets;
