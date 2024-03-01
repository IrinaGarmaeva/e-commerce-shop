import { useState, useEffect, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isValidEmail,
  isValidPassword,
  VALIDATION_MESSAGES,
  handleChangeInput,
} from "../../../utils/validationConstants";
import { ROUTES } from "../../../utils/constants";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Input from "../../design-system/Input/Input";
import Loader from "../../design-system/Loader/Loader";
import { useLoginMutation } from "../../../redux/slices/usersApiSlice/usersApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice/authSlice";
import { toast } from "react-toastify";
import { RootState } from "../../../redux/store";
import { PiEyeClosedLight } from "react-icons/pi";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { values, handleChange, errors, setErrors, isValid, setIsValid } =
    useFormAndValidation({
      email: "",
      password: "",
    });

  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  useEffect(() => {
    if (errors.email || errors.password || !values.email || !values.password) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const email = values.email;
      const password = values.password;
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      // navigate(redirect)
    } catch (error) {
      console.log(error);
      toast.error(VALIDATION_MESSAGES.failedAuth);
    }
  };

  return (
    <section className="max-container padding py-10">
      <div className="flex flex-col justify-center items-center text-text-main">
        <p className="text-2xl max-[500px]:text-xl">Sign In to Your Account</p>
        <form
          className="w-96 pt-6 px-15 flex flex-col gap-5 max-[500px]:w-72"
          noValidate
          onSubmit={handleLogin}
        >
          <fieldset className="flex flex-col">
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
                name="password"
                value={values.password}
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
                error={errors.password}
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
          </fieldset>
          <div className="text-right text-xs">
            <Link to={ROUTES.resetPassword} className=" border-b border-pink">
              Forgot your password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"
            disabled={!isValid }
          >
            Sign In
          </button>
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/"}
            className="text-pink border border-1 border-pink  px-6 py-3 bg-transparent rounded-md text-center"
          >
            Sign Up
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
