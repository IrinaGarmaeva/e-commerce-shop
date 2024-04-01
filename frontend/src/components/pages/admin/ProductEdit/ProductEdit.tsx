import { useEffect, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../design-system/Loader/Loader";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../../redux/slices/productsSlice/productsSlice";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";
import { ROUTES } from "../../../../utils/constants";
import Input from "../../../design-system/Input/Input";

const ProductEdit = () => {
  const { id: productId } = useParams();

  const navigate = useNavigate();

  const {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
  } = useFormAndValidation({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    countInStock: 0,
  });

  const {
    data: product,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId!);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setValues({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
        countInStock: product.countInStock,
      });
    }
  }, [product]);

  const handleUpdate = async(e: FormEvent<HTMLFormElement>): Promise<void>  => {
    e.preventDefault();
    const updatedProduct = {
      _id: productId!,
      name: values.name,
      price: values.price,
      description: values.description,
      image: values.image,
      category: values.category,
      countInStock: values.countInStock,
    }

    try {
      await updateProduct(updatedProduct);
      refetch();
      navigate(-1);
      toast.success(`Product: ${updatedProduct._id} have been updated`);
    } catch (err) {
      toast.error("There is an error");
    }
  }

  return (
    <section className="max-container padding py-10">
      <div className="flex flex-col">
        <Link
          to={ROUTES.admin.products}
          className="bg-pink px-10 py-3 mt-4 text-white rounded-md font-semibold w-40 ease-linear transition-all hover:scale-105"
        >
          Go Back
        </Link>
        <div className="mt-5 flex flex-col self-center justify-center">
          <h2 className="text-2xl max-[500px]:text-xl text-center">Edit Product</h2>
          <form className="flex flex-col w-96 pt-6 px-15" onSubmit={handleUpdate}>
            <fieldset className="flex flex-col" >
              <label htmlFor="Product Name" className="text-base">
                Product Name
              </label>
              <Input
                type="text"
                name="name"
                value={values.name}
                error={errors.name}
                inputClassName="input"
                spanClassName="min-h-5 text-orange text-xs mt-1"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="Product Name" className="text-base">
                Price
              </label>
              <Input
                type="number"
                name="price"
                value={values.price}
                error={errors.price}
                inputClassName="input"
                spanClassName="min-h-5 text-orange text-xs mt-1"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="Product Name" className="text-base">
                Description
              </label>
              <Input
                type="text"
                name="description"
                value={values.description}
                error={errors.description}
                inputClassName="input"
                spanClassName="min-h-5 text-orange text-xs mt-1"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="Product Name" className="text-base">
                Image
              </label>
              <Input
                type="text"
                name="image"
                value={values.image}
                error={errors.image}
                inputClassName="input"
                spanClassName="min-h-5 text-orange text-xs mt-1"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="Product Name" className="text-base">
                Category
              </label>
              <Input
                type="text"
                name="category"
                value={values.category}
                error={errors.category}
                inputClassName="input"
                spanClassName="min-h-5 text-orange text-xs mt-1"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="Product Name" className="text-base">
                Count in Stock
              </label>
              <Input
                type="number"
                name="countInStock"
                value={values.countInStock}
                error={errors.countInStock}
                inputClassName="input"
                spanClassName="min-h-5 text-orange text-xs mt-1"
                onChange={(e) => handleChange(e)}
              />
            </fieldset>
            <button
            className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={!isValid}
          >
            Update
          </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
