import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select, {StylesConfig, ActionMeta, SingleValue} from "react-select";
import { toast } from "react-toastify";
import Loader from "../../../design-system/Loader/Loader";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../../../redux/slices/productsSlice/productsSlice";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";
import { ROUTES, categories } from "../../../../utils/constants";
import Input from "../../../design-system/Input/Input";
import { OptionType } from "./types";

const ProductEdit = () => {
  const [productLoaded, setProductLoaded] = useState<boolean>(false);
  const { id: productId } = useParams();

  const navigate = useNavigate();

  const { values, setValues, handleChange, errors, isValid, setIsValid } =
    useFormAndValidation({
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
    isLoading,
  } = useGetProductDetailsQuery(productId!);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product && !productLoaded) {
      setValues({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
        countInStock: product.countInStock,
      });
      setProductLoaded(true);
    }
  }, [product, productLoaded, setValues]);

  useEffect(() => {
    if (!values) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [values]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const updatedProduct = {
      _id: productId!,
      name: values.name,
      price: values.price,
      description: values.description,
      image: values.image,
      category: values.category.toLocaleLowerCase(),
      countInStock: values.countInStock,
    };
    try {
      await updateProduct(updatedProduct);
      refetch();
      navigate(-1);
      toast.success(`Product: ${updatedProduct.name} have been updated`);
    } catch (err) {
      toast.error("There is an error");
    }
  };

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setValues({ ...values, image: res.image });
      } catch (error) {
        toast.error("There is an error");
      }
    }
  };

  const handleChangeCategory = (
    selectedOption: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (actionMeta.action === 'select-option' && selectedOption) {
      const option = selectedOption as OptionType;
      setValues({ ...values, category: option.value });
    } else if (actionMeta.action === 'clear') {
      setValues({ ...values, category: '' });
    }
  };

  const customStyles: StylesConfig<OptionType, false>  = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "#333232",
      width: "100%",
      height: "28px",
      minHeight: '28px',
      borderRadius: "6px",
      border: state.isFocused ? "1px solid #FF005B" : "1px solid #FF005B",
      outline: "none",
      boxShadow: state.isFocused ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none",
      position: 'relative',
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: "center",
      '&:hover': {
        borderColor: "#FF005B",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#FF005B' : "#fff",
      color: state.isFocused ? "#fff" : "#333333",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: 'left',
      height: '28px',
      '&:hover': {
        color: "#fff",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0px",
      height: "100%",
      width: "100%",
      position: "absolute",
      top: '0',
      left: '0',
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '4px',
      width: '384px',
      backgroundColor: '#fff',
      borderRadius: '6px',
      paddingTop: '6px',
      paddingBottom: '6px',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: '0',
      position: 'absolute',
      top: '0',
      right: '0'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#333333",
      padding: '10px',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
      transition: 'transform 0.3s ease',
      cursor: "pointer",
      '&:hover': {
        color: "#FF005B",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333333",
      fontSize: '14px',
      fontWeight: '400',
      margin: '0px',
      padding: '0px 8px',
      textAlign: 'left',
      height: "100%"
    }),
  };

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
          <h2 className="text-2xl max-[500px]:text-xl text-center">
            Edit Product
          </h2>
          {loadingUpload && <Loader />}
          {isLoading ? (
            <Loader />
          ) : (
            <form
              className="flex flex-col w-96 pt-6 px-15"
              onSubmit={handleUpdate}
            >
              <fieldset className="flex flex-col">
                <label htmlFor="name" className="text-base">
                  Product Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  error={errors.name}
                  inputClassName="input"
                  spanClassName="min-h-5 text-orange text-xs mt-1"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter name"
                />
                <label htmlFor="price" className="text-base">
                  Price
                </label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={values.price}
                  error={errors.price}
                  inputClassName="input"
                  spanClassName="min-h-5 text-orange text-xs mt-1"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter price"
                />
                <label htmlFor="description" className="text-base">
                  Description
                </label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={values.description}
                  error={errors.description}
                  inputClassName="input"
                  spanClassName="min-h-5 text-orange text-xs mt-1"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter product description"
                />
                <label htmlFor="image" className="text-base">
                  Image
                </label>
                <Input
                  type="text"
                  id="image"
                  name="image"
                  value={values.image}
                  error={errors.image}
                  inputClassName="input"
                  spanClassName="min-h-5 text-orange text-xs mt-1"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter image url"
                />
                <input
                  name="file"
                  type="file"
                  className="block file:bg-pink file:text-white file:font-semibold file:border-none file:h-full file:mr-3 text-sm border border-pink h-7 rounded-md pr-2 focus:outline-none focus:shadow-md cursor-pointer"
                  onChange={handleUploadFile}
                />
                <span className="min-h-5 text-orange text-xs mt-1"></span>
                <label htmlFor="category" className="text-base">
                  Category
                </label>
                {/* <select
                  id="category"
                  // name="category"
                  value={values.category}
                  onChange={(e) => handleChange(e)}
                  className="input h-full appearance-none border rounded-md  focus:outline-none focus:border-pink"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      selected={values.category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <span className="min-h-5 text-orange text-xs mt-1">
                  {errors.category}
                </span> */}
                <Select
                  value={{ value: values.category, label: values.category }}
                  onChange={handleChangeCategory}
                  options={categories.map((category) => ({
                    value: category,
                    label: category,
                  }))}
                  styles={customStyles}
                  isSearchable={false}
                />
                <span className="min-h-5 text-orange text-xs mt-1">
                  {errors.category}
                </span>
                <label htmlFor="countInStock" className="text-base">
                  Count in Stock
                </label>
                <Input
                  type="number"
                  id="countInStock"
                  name="countInStock"
                  value={values.countInStock}
                  error={errors.countInStock}
                  inputClassName="input"
                  spanClassName="min-h-5 text-orange text-xs mt-1"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter count in stock"
                />
              </fieldset>
              {isUpdating && <Loader />}
              <button
                className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={!isValid}
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
