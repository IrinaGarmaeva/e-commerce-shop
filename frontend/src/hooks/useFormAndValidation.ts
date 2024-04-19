import { useState, useCallback, ChangeEvent } from "react";

type FormValues = {
  [key: string]: string | number;
};

const useFormAndValidation = <T extends FormValues>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });

    const isValid = e.target.checkValidity();
    setErrors({ ...errors, [name]: isValid ? '' : e.target.validationMessage });
    setIsValid(isValid);
  };

  const resetForm = useCallback(
    (newValues: Partial<T> = {}, newErrors = {}, newIsValid = false) => {
      setValues({...initialValues, ...newValues});
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, initialValues]
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
