import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
  VALIDATION_MESSAGES,
  validateInput,
} from "../../../utils/validationConstants";
import { ROUTES } from "../../../utils/constants";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Input from "../../design-system/Input/Input";

const Register = () => {
  const { values, handleChange, errors, setErrors } = useFormAndValidation({
    name: "",
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    if (errors.email || errors.password || !values.email || !values.password) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [errors]);

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    isValidFunction: (value: string) => boolean,
    validationMessage: string
  ) => {
    handleChange(e);
    validateInput(
      e.target.name,
      e.target.value,
      errors,
      setErrors,
      isValidFunction,
      validationMessage
    );
  };

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
                  isValidName,
                  VALIDATION_MESSAGES.invalidName
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
                  isValidEmail,
                  VALIDATION_MESSAGES.invalidEmail
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
                  isValidPassword,
                  VALIDATION_MESSAGES.invalidPassword
                )
              }
              inputClassName="input"
              spanClassName="min-h-8 text-orange text-xs mt-1"
            />
          </fieldset>
          <button
            className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={!isFormValid}
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
