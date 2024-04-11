import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { useRegisterMutation } from "../../../redux/slices/usersApiSlice/usersApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice/authSlice";
import { RootState } from "../../../redux/store";
import { PiEyeClosedLight } from "react-icons/pi";
import Loader from "../../design-system/Loader/Loader";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { values, handleChange, errors, setErrors, isValid, setIsValid } =
    useFormAndValidation({
      name: "",
      email: "",
      password: "",
    });

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  useEffect(() => {
    if (
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (values.confirmPassword !== values.password) {
      setErrors({ confirmPassword: "Passwords do not match" });
    } else {
      try {
        const email = values.email;
        const password = values.password;
        const name = values.name;
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return isLoading ? (<Loader />) :(
    <section className="max-container padding py-10">
      <div className="flex flex-col justify-center items-center text-text-main">
        <p className="text-2xl max-[500px]:text-xl">Create an Account</p>
        <form
          className="w-96 pt-6 px-15 flex flex-col gap-5 max-[500px]:w-72"
          noValidate
          onSubmit={handleRegister}
        >
          <fieldset className="flex flex-col">
            <label htmlFor="name" className="text-base">
              Your Name
            </label>
            <Input
              type="text"
              id="name"
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
                  isValidName
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
              id="email"
              name="email"
              value={values.email}
              onChange={(e) =>
                handleChangeInput(
                  e,
                  errors,
                  setErrors,
                  handleChange,
                  VALIDATION_MESSAGES.invalidEmail,
                  isValidEmail
                )
              }
              error={errors.email}
              inputClassName="input"
              spanClassName="min-h-5 text-orange text-xs mt-1"
            />
            <label htmlFor="password" className="text-base">
              Password
            </label>
            <div className="relative w-full flex flex-col">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
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
                    isValidPassword
                  )
                }
                inputClassName="input w-full"
                spanClassName="min-h-8 text-orange text-xs mt-1"
              />
              <button
                type="button"
                className="absolute top-3 right-2 transform -translate-y-1/2 hover:text-pink"
                onClick={() => setShowPassword(!showPassword)}
              >
                <PiEyeClosedLight size={20} />
              </button>
            </div>
            <label htmlFor="confirmPassword" className="text-base">
              Confirm Password
            </label>
            <div className="relative w-full flex flex-col">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={(e) =>
                  handleChangeInput(
                    e,
                    errors,
                    setErrors,
                    handleChange,
                    VALIDATION_MESSAGES.invalidPassword,
                    isValidPassword
                  )
                }
                inputClassName="input w-full"
                spanClassName="min-h-8 text-orange text-xs mt-1"
              />
              <button
                type="button"
                className="absolute top-3 right-2 transform -translate-y-1/2 hover:text-pink"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <PiEyeClosedLight size={20} />
              </button>
            </div>
          </fieldset>
          <button
            className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={!isValid}
          >
            Sign Up
          </button>
          <Link
            to={redirect ? `/login?redirect=${redirect}` : ROUTES.sign.in}
            className="text-pink border border-pink  px-6 py-3 bg-transparent rounded-md text-center"
          >
            Already Have an Account
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
