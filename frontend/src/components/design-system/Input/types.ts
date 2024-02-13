import { ChangeEvent } from "react";

export type InputProps = {
  type: string,
  name: string,
  value: string,
  placeholder?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  error: string,
  inputClassName: string,
  spanClassName: string,
  spanId?: string,
  minLength?: number,
  maxLength?: number
}
