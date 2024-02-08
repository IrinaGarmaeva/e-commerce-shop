import { ButtonProps } from "./types";

function Button({ className, type, onClick, text, children, disabled }: ButtonProps) {
  return (
    <button className={`${className} cursor-pointer`} type={type} onClick={onClick} disabled={!disabled}>
      {children ? children : text}
    </button>
  );
}

export default Button;
