import { ChangeEvent } from "react";

export type InputProps = {
  type: string,
  name: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  error: string,
  inputClassName: string,
  spanClassName: string,
}
