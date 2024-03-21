import { TfiArrowCircleRight } from "react-icons/tfi";
import {
  handleChangeInput,
  VALIDATION_MESSAGES,
  isValidCertificate,
} from "../../../utils/validationConstants";
import Button from "../Button/Button";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import { FormEvent, useEffect } from "react";
import {
  useGetOrderDetailsQuery,
  usePayOrderByCertificateMutation
} from "../../../redux/slices/ordersApiSlice/ordersApiSlice";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

const CertificateInput = () => {
  const { orderId } = useParams();

  const {
    data: order,
    error,
    isLoading,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrderByCertificate, {isLoading: loadingPay}] = usePayOrderByCertificateMutation();

  const {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
  } = useFormAndValidation({
    certificateNumber: 0,
  });

  useEffect(() => {
    if (errors.certificateNumber || !values.certificateNumber) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const checkValidity = isValid ? "disabled" : "";

  const addCertificateNumber = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderId || !order) {
      return;
    }

    if (!values.certificateNumber) {
      setErrors({
        certificateNumber: VALIDATION_MESSAGES.emptyCertificateNumber,
      });
    } else {
      setValues({ certificateNumber: "" });
      await payOrderByCertificate({orderId, details: { ...order, certificateNumber: values.certificateNumber }})
      setValues({ certificateNumber: 0 });
      refetch();
      toast.success("Confirm successful, u entered certificate number");
    }
  };

  return (
    <form
      onSubmit={addCertificateNumber}
      className="mt-4 px-3 max-sm:w-full"
      noValidate
      autoComplete="off"
    >
      <div className="flex flex-row relative mb-3 bg-white rounded-md outline outline-1 outline-pink">
        <input
          type="certificateNumber"
          value={values.certificateNumber === 0 ? "" : values.certificateNumber }
          name="certificateNumber"
          placeholder="Your certificate number"
          onChange={(e) =>
            handleChangeInput(
              e,
              errors,
              setErrors,
              handleChange,
              VALIDATION_MESSAGES.invalidCertificateNumber,
              isValidCertificate
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
      <span className="text-sm pl-3 text-pink">{errors.certificateNumber}</span>
      {loadingPay && <Loader />}
    </form>
  );
};

export default CertificateInput;
