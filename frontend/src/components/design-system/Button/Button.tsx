import { ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset";

type ButtonProps = {
  className?: string;
  type?: ButtonType;
  onClick?: () => void;
  text?: string;
  disabled?: string;
  children?: ReactNode;
};

function Button({ className, type, onClick, text, children, disabled }: ButtonProps) {
  return (
    <button className={`${className} cursor-pointer`} type={type} onClick={onClick} disabled={!disabled}>
      {children ? children : text}
    </button>
  );
}

export default Button;
