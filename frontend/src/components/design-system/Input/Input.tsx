import {FC} from 'react';
import { InputProps } from './types';

const Input: FC<InputProps> = ({ type, name, value, onChange, error, inputClassName, spanClassName }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        className={inputClassName}
        // required
        value={value}
        onChange={onChange}
      />
      <span className={spanClassName}>{error}</span>
    </>
  );
};

export default Input
