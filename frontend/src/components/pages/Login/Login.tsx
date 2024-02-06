import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  isValidEmail,
  VALIDATION_MESSAGES
} from "../../../utils/validationConstants";
import Button from "../../design-system/Button/Button";
import { ROUTES } from "../../../utils/constants";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setError(VALIDATION_MESSAGES.invalidEmail);
      !e.target.value && setError("");
    } else {
      setError("");
    }
  };

  const handleLogin = () => {};

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
            <input
              type="email"
              name="email"
              className="input"
              required
              value={email}
              onChange={handleChangeEmail}
            />
            <span className="min-h-5 text-orange text-sm">Email error</span>
            <label htmlFor="password" className="text-base">Password</label>
            <input
              type="password"
              name="email"
              className="input"
              required
              value={password}
              onChange={handleChangeEmail}
            />
            <span className="min-h-5 text-orange text-sm">Password Error</span>
          </fieldset>
          <div className="text-right text-xs">
            <Link to={ROUTES.resetPassword} className=" border-b border-pink">Forgot your password?</Link>
          </div>
          <Button
            className="bg-pink px-6 py-3 text-white rounded-md"
            text="Sign In"
            type="submit"
          />
          <Link
            to={ROUTES.sign.up}
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
