import { FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
  VALIDATION_MESSAGES,
  handleChangeInput,
} from "../../../utils/validationConstants";
import { ROUTES } from "../../../utils/constants";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Input from "../../design-system/Input/Input";

const Register = () => {
  const { values, handleChange, errors, setErrors, isValid, setIsValid } = useFormAndValidation({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (errors.email || errors.password || !values.email || !values.password) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="max-container padding py-10">
      <div className="flex flex-col justify-center items-center text-text-main">
        <p className="text-2xl max-[500px]:text-xl">Create an Account</p>
        <form
          className="w-96 pt-6 px-15 flex flex-col gap-5 max-[500px]:w-72"
          noValidate
          onSubmit={handleRegister}
        >
          <fieldset className="flex flex-col">
            <label htmlFor="Your Name" className="text-base">
              Your Name
            </label>
            <Input
              type="text"
              name="name"
              value={values.name}
              error={errors.name}
              onChange={(e) =>
                handleChangeInput(
                  e,
                  errors,
                  setErrors,
                  handleChange,
                  VALIDATION_MESSAGES.invalidName,
                  isValidName,
                )
              }
              inputClassName="input"
              spanClassName="min-h-5 text-orange text-xs mt-1"
            />
            <label htmlFor="email" className="text-base">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={values.email}
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
              error={errors.email}
              inputClassName="input"
              spanClassName="min-h-5 text-orange text-xs mt-1"
            />
            <label htmlFor="password" className="text-base">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={values.password}
              error={errors.password}
              onChange={(e) =>
                handleChangeInput(
                  e,
                  errors,
                  setErrors,
                  handleChange,
                  VALIDATION_MESSAGES.invalidPassword,
                  isValidPassword,
                )
              }
              inputClassName="input"
              spanClassName="min-h-8 text-orange text-xs mt-1"
            />
          </fieldset>
          <button
            className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={!isValid}
          >
            Sign Up
          </button>
          <Link
            to={ROUTES.sign.in}
            className="text-pink border border-1 border-pink  px-6 py-3 bg-transparent rounded-md text-center"
          >
            Already Have an Account
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
