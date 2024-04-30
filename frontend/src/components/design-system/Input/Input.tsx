import {FC, ChangeEvent} from 'react';

type InputProps = {
  type: string,
  id?: string,
  name: string,
  value: string | number,
  placeholder?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  error?: string,
  inputClassName: string,
  spanClassName?: string,
  spanId?: string,
  minLength?: number,
  maxLength?: number
}

const Input: FC<InputProps> = ({ type, id, name, value, placeholder, onChange, error, inputClassName, spanClassName, spanId, minLength, maxLength }) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        className={inputClassName}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        minLength={minLength}
        maxLength={maxLength}
      />
      <span className={spanClassName} id={spanId}>{error}</span>
    </>
  );
};

export default Input
