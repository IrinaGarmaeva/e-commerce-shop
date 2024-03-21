import { useState, useCallback, ChangeEvent } from "react";

type FormValues = {
  [key: string]: string | number;
};

const useFormAndValidation = (initialValues: FormValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });

    const isValid = e.target.checkValidity();
    setErrors({ ...errors, [name]: isValid ? '' : e.target.validationMessage });
    setIsValid(isValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    setErrors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
};

export default useFormAndValidation;
