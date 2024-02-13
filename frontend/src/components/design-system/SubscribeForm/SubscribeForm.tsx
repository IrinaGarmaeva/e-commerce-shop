import { type FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { TfiArrowCircleRight } from "react-icons/tfi";
import {
  VALIDATION_MESSAGES,
  isValidEmail,
  handleChangeInput,
} from "../../../utils/validationConstants";
import Button from "../Button/Button";

import useFormAndValidation from "../../../hooks/useFormAndValidation";

const SubscribeForm = () => {
  const {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
  } = useFormAndValidation({
    email: "",
  });

  const checkValidity = isValid ? "disabled" : "";

  useEffect(() => {
    if (errors.email || !values.email) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.email) {
      setErrors({ email: VALIDATION_MESSAGES.invalidEmail });
    } else {
      setValues({ email: "" });
      toast.success(VALIDATION_MESSAGES.validEmail);
    }
  };

  return (
    <section className="pr-5 w-80 max-md:w-72 max-sm:self-center max-sm:w-full max-sm:pr-0 max-sm:flex max-sm:flex-col max-sm:items-center">
      <h3 className="uppercase font-bold max-md:text-sm max-sm:text-center">
        Get 10% discount
      </h3>
      <p className="uppercase mt-3 max-md:text-sm max-sm:text-center">
        Subscribe to our newsletter
      </p>
      <form
        onSubmit={handleSubscribe}
        className="mt-4 max-sm:w-full"
        noValidate
        autoComplete="off"
      >
        <div className="flex flex-row relative mb-3 bg-white rounded-md outline outline-1 outline-gray">
          <input
            type="email"
            value={values.email}
            name="email"
            placeholder="Your Email Address"
            onChange={(e) =>
              handleChangeInput(
                e,
                errors,
                setErrors,
                handleChange,
                VALIDATION_MESSAGES.invalidEmail,
                isValidEmail,
              )
            }
            autoComplete="off"
            className="w-10/12 pl-3 h-12 outline-none rounded-md text-sm text-text-main"
          />
          <Button
            type="submit"
            disabled={checkValidity}
            children={
              <TfiArrowCircleRight
                size={22}
                className={`absolute right-3 top-3.5 z-10 ${
                  isValid ? "text-pink" : "text-gray"
                }`}
              />
            }
          />
        </div>
        <span className="text-sm pl-3">{errors.email}</span>
      </form>
    </section>
  );
};

export default SubscribeForm;
