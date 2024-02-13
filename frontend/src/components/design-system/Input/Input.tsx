import {FC} from 'react';
import { InputProps } from './types';

const Input: FC<InputProps> = ({ type, name, value, placeholder, onChange, error, inputClassName, spanClassName, spanId, minLength, maxLength }) => {
  return (
    <>
      <input
        type={type}
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
