import { ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset";

export type ButtonProps = {
  className?: string;
  type?: ButtonType;
  onClick?: () => void;
  text?: string;
  disabled?: string;
  children?: ReactNode;
};
