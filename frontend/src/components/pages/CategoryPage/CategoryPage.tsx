import { useNavigate } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../../redux/slices/productsSlice/productsSlice";

import ProductList from "../../design-system/ProductList/ProductList";
import Loader from "../../design-system/Loader/Loader";

interface CategoryPageProps {
  categoryName: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName }) => {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery({ category: categoryName });

  return (
    <section className="max-container padding py-10 flex justify-center">
      {isLoading ? (
        <Loader />
      ) : error && error instanceof Error ? (
        <div>
          {error?.message || "Error while fetching data. Please try again."}
        </div>
      ) : (
        <>
          {products?.length ? (
            <ProductList products={products!} />
          ) : (
            <div className="flex flex-col items-center ">
              <h2 className="text-center font-bold text-text-main">
                Sorry, there are no products in the {categoryName} category
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

export default CategoryPage;
