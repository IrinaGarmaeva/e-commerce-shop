import { ChangeEvent, useState } from "react";
import {
  isValidEmail,
  VALIDATION_MESSAGES,
} from "../../../utils/validationConstants";
import Button from "../../design-system/Button/Button";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setError(VALIDATION_MESSAGES.invalidEmail);
      !e.target.value && setError("");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {};

  return (
    <section className="padding max-container flex items-center justify-center py-10">
      <div className="flex flex-col justify-center items-center max-w-96">
        <h2 className="text-2xl max-[500px]:text-xl">Forgot your password?</h2>
        <p className="mt-4 text-sm text-center">
          Please enter the email address you used to create your account, and we
          will send the instructions to reset your password.
        </p>
        <form
          className="w-96 pt-6 px-15 flex flex-col gap-3 max-[500px]:w-72"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            value={email}
            className="input"
            placeholder="Enter your Email"
            autoComplete="off"
            onChange={handleChange}
          />
          <span className="min-h-5 text-orange text-xs">{error}</span>
          <Button
            className="bg-pink px-6 py-3 text-white rounded-md "
            text="Submit"
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
