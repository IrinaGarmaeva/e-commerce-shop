import { TfiArrowCircleRight } from "react-icons/tfi";
import {
  handleChangeInput,
  VALIDATION_MESSAGES,
  isValidPromocode,
} from "../../../utils/validationConstants";
import Button from "../Button/Button";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";

const PromocodeInput = () => {

  const {
    values,
    // setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
  } = useFormAndValidation({
    promocode: '',
  });

  useEffect(() => {
    if (errors.promocode || !values.promocode) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors, setIsValid]);

  const checkValidity = isValid ? "disabled" : "";

  const addPromocode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.promocode) {
      setErrors({
        certificateNumber: VALIDATION_MESSAGES.emptyCertificateNumber,
      });
    } else {
      // setValues({ promocode: "" });
      toast.success("Confirm successful, u entered correct promocode");
    }
  };

  return (
    <form
      onSubmit={addPromocode}
      className="mt-4 max-sm:w-full"
      noValidate
      autoComplete="off"
    >
      <div className="flex flex-row relative mb-3 bg-white rounded-md outline outline-1 outline-pink">
        <input
          type="promocode"
          value={values.promocode || ''}
          name="promocode"
          placeholder="Enter promocode"
          onChange={(e) =>
            handleChangeInput(
              e,
              errors,
              setErrors,
              handleChange,
              VALIDATION_MESSAGES.invalidPromocode,
              isValidPromocode
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
      <span className="text-sm text-pink">{errors.promocode}</span>
    </form>
  );
};

export default PromocodeInput;
