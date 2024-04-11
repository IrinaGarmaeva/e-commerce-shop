import { ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../../redux/slices/cartSlice/cartSlice";
import { RootState } from "../../../redux/store";
import { ROUTES } from "../../../utils/constants";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Input from "../../design-system/Input/Input";
import CheckoutSteps from "../../design-system/CheckoutSteps/CheckoutSteps";

const Shipping = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;

  const { values, setValues, isValid, setIsValid } =
  useFormAndValidation({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    country: shippingAddress?.country || "",
    postalCode: shippingAddress?.postalCode || ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (!values.address || !values.city || !values.postalCode || !values.country) {
      setIsValid(false);
    } else {
      setIsValid(true)
    }
    return;
  }, [values.address, values.city, values.postalCode, values.country, setIsValid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address: values.address, city: values.city, country: values.country, postalCode: values.postalCode }));
    navigate(ROUTES.payment);
  };

  return (
    <section className="max-container padding py-10">
      <div className="flex flex-col justify-center items-center text-text-main">
        <CheckoutSteps step1 step2/>
        <h2 className="text-2xl mt-6">Shipping</h2>
        <form  className="w-96 pt-6 px-15 flex flex-col gap-5 max-[500px]:w-72" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col">
            <label htmlFor="address">
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({...values, address: e.target.value})
              }
              error=""
              inputClassName="input"
              spanClassName=""
              placeholder={"Enter Address"}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label htmlFor="city">
              City
            </label>
            <Input
              type="text"
              id="city"
              name="city"
              value={values.city}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({...values, city: e.target.value})
              }
              error=""
              inputClassName="input"
              spanClassName=""
              placeholder={"Enter City"}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label htmlFor="country">
              Country
            </label>
            <Input
              type="text"
              id="country"
              name="country"
              value={values.country}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({...values, country: e.target.value})
              }
              error=""
              inputClassName="input"
              spanClassName=""
              placeholder={"Enter Country"}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label htmlFor="postalCode">
              Postal Code
            </label>
            <Input
              type="text"
              id="postalCode"
              name="postalCode"
              value={values.postalCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValues({...values, postalCode: e.target.value})
              }
              error=""
              inputClassName="input"
              spanClassName=""
              placeholder={"Enter Postal Code"}
            />
          </fieldset>
          <button
            type="submit"
            className="bg-pink px-6 py-3 mt-4 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
            disabled={!isValid}
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default Shipping;
