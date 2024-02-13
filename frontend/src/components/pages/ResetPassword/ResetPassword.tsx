import { FormEvent, useEffect } from "react";
import {
  isValidEmail,
  VALIDATION_MESSAGES,
  handleChangeInput
} from "../../../utils/validationConstants";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Input from "../../design-system/Input/Input";

const ResetPassword = () => {
  const {values, handleChange, errors, setErrors, isValid, setIsValid} = useFormAndValidation({
    email: '',
  })

  useEffect(() => {
    if (errors.email || !values.email) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('You have submitted reset password form')
  };

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
          <Input
          type="email"
          name="email"
          value={values.email}
          inputClassName="input"
          spanClassName="min-h-5 text-orange text-xs"
          placeholder="Enter your Email"
          onChange={(e) => handleChangeInput(e, errors, setErrors, handleChange, VALIDATION_MESSAGES.invalidEmail, isValidEmail)}
          error={errors.email}
          />
          <button className="bg-pink px-6 py-3 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-70"  type="submit" disabled={!isValid}>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
