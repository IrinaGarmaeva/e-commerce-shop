import { Link } from "react-router-dom";
import Loader from "../../../design-system/Loader/Loader";
import { useGetProductsQuery, useCreateProductMutation, useUploadProductImageMutation } from "../../../../redux/slices/productsSlice/productsSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IProduct } from "../../../../types";
import { ROUTES } from "../../../../utils/constants";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery("");

  const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")){
    try {
      await createProduct();
      refetch();
      toast.success('Product created')
    } catch (error) {
      toast.error("error");
    }
    }
  }

  const deleteProduct = async (productId: string) => {
    console.log("deleted product", productId);
  };

  return (
    <section className="max-container padding py-10">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl mt-6">Products</h2>
          <button
            type="button"
            className="w-56 mt-5 py-3 bg-pink text-white font-semibold rounded-md"
            onClick={createProductHandler}
          >
            Create Product
          </button>
        </div>
        {loadingCreate && <Loader />}
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
                  <th scope="col">NAME</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">DESCRIPTION</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: IProduct) => (
                  <tr key={product._id}>
                    <td className="py-2 px-2 whitespace-nowrap">
                      {product._id}
                    </td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      {product.price} RSD
                    </td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      {product.category}
                    </td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      {product.description}
                    </td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      <Link to={`${ROUTES.admin.product}/${product._id}/edit`}>
                        <button className="mx-2" >
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="mx-2"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListScreen;
