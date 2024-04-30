import { FC, FormEvent } from "react";
import { TfiArrowCircleRight } from "react-icons/tfi";
import {
  handleChangeInput,
  VALIDATION_MESSAGES,
  isValidPromocode,
} from "../../../utils/validationConstants";
import Button from "../Button/Button";

type PromocodeInputProps = {
  addPromocode: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  value: string;
  errors: {
    [key: string]: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  checkValidity: "" | "disabled";
  isValid: boolean;
};

const PromocodeInput: FC<PromocodeInputProps> = ({
  addPromocode,
  value,
  errors,
  setErrors,
  handleChange,
  checkValidity,
  isValid,
}) => {
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
          value={value || ""}
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
