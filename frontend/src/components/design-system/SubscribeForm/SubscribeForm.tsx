import { type ChangeEvent, type FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { TfiArrowCircleRight } from "react-icons/tfi";
import {
  VALIDATION_MESSAGES,
  isValidEmail,
} from "../../../utils/validationConstants";
import Button from "../Button/Button";

const SubscribeForm = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const checkValidity = isValid ? "disabled" : "";

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setError(VALIDATION_MESSAGES.invalidEmail);
      setIsValid(false);
      !e.target.value && setError("");
    } else {
      setError("");
      setIsValid(true);
    }
  };

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError(VALIDATION_MESSAGES.invalidEmail);
    } else {
      setEmail("");
      toast.success(VALIDATION_MESSAGES.validEmail);
    }
  };

  return (
    <section className="pr-5 w-80 max-md:w-72">
      <h3 className="uppercase font-bold max-md:text-sm">Get 10% discount</h3>
      <p className="uppercase mt-3 max-md:text-sm">Subscribe to our newsletter</p>
      <form
        onSubmit={handleSubscribe}
        className="mt-4"
        noValidate
        autoComplete="off"
      >
        <div className="flex flex-row relative mb-3 bg-white rounded-md outline outline-1 outline-gray">
          <input
            type="email"
            value={email}
            name="email"
            placeholder="Your Email Address"
            onChange={handleChangeEmail}
            autoComplete="off"
            className="w-10/12 pl-3 h-12 outline-none rounded-md text-sm text-text-main"
          />
          <Button type="submit" disabled={checkValidity} children={<TfiArrowCircleRight
              size={22}
              className={`absolute right-3 top-3.5 z-10 ${
                isValid ? "text-pink" : "text-gray"
              }`}
            />}/>
        </div>
        <span className="text-sm pl-3">{error}</span>
      </form>
    </section>
  );
};

export default SubscribeForm;
