import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  PATTERN_EMAIL,
  VALIDATION_MESSAGES,
} from "../../../utils/validationConstants";
import Button from "../../design-system/Button/Button";
import { ROUTES } from "../../../utils/constants";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = () => {

  }

  const handleChangeEmail = () => {

  }

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
          <input
            type="text"
            name="name"
            className="input"
            required
            value={email}
            // onChange={() => {}}
          />
          <span className="min-h-5 text-orange text-xs">Error</span>
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
          <span className="min-h-5 text-orange text-xs">Error</span>
          <label htmlFor="password" className="text-base">Password</label>
          <input
            type="password"
            name="email"
            className="input"
            required
            value={password}
            // onChange={}
          />
          <span className="min-h-5 text-orange text-xs">fgduyfhh</span>
        </fieldset>
        <Button
          className="bg-pink px-6 py-3 text-white rounded-md"
          text="Sign Up"
          type="submit"
        />
        <Link
          to={ROUTES.sign.in}
          className="text-pink border border-1 border-pink  px-6 py-3 bg-transparent rounded-md text-center"
        >
          Already Have an Account
        </Link>
      </form>
    </div>
  </section>
  )
}

export default Register
